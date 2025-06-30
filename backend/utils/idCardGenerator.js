import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, 'logo.png');
const logoUrl = 'https://cdn.pixabay.com/photo/2016/03/31/19/14/wheelchair-1294828_1280.png'; // public domain wheelchair PNG

// Download logo if not present
const ensureLogo = async () => {
  if (!fs.existsSync(logoPath)) {
    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(logoPath);
      https.get(logoUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      }).on('error', (err) => {
        fs.unlinkSync(logoPath);
        reject(err);
      });
    });
  }
};

// Ensure directories exist
const uploadsDir = path.join(__dirname, '../uploads');
const idCardsDir = path.join(__dirname, '../idcards');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
} 

if (!fs.existsSync(idCardsDir)) {
  fs.mkdirSync(idCardsDir, { recursive: true });
}

export const generateIdCard = async (player) => {
  try {
    await ensureLogo();
    console.log(`Starting modern PDF ID card generation for player: ${player.playerId}`);
    
    // Create PDF document
    const doc = new PDFDocument({
      size: [650, 400], // ID card size
      margins: 0,
      autoFirstPage: true
    });
    
    // Generate filename
    const idCardFilename = `idcard_${player.playerId}_${Date.now()}.pdf`;
    const idCardPath = path.join(idCardsDir, idCardFilename);
    
    // Pipe to file
    const stream = fs.createWriteStream(idCardPath);
    doc.pipe(stream);
    
    // Set up the document
    setupDocument(doc, player);
    
    // Add background design
    addCardBorder(doc);
    
    // Add header section
    addHeaderSection(doc);
    
    // Add player photo (circular)
    await addPlayerPhoto(doc, player);
    
    // Add player information (improved layout)
    addPlayerDetails(doc, player);
    
    // Add signature line and watermark
    addFooter(doc);
    
    // Finalize the document
    doc.end();
    
    // Wait for the stream to finish
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
    
    console.log(`Modern PDF ID card generated successfully: ${idCardFilename}`);
    
    // Return relative path for database storage
    return `/idcards/${idCardFilename}`;
    
  } catch (error) {
    console.error('Error generating modern PDF ID card:', error);
    throw new Error(`Failed to generate ID card: ${error.message}`);
  }
};

const setupDocument = (doc, player) => {
  doc.info.Title = `Para Sports ID Card - ${player.firstName} ${player.lastName}`;
  doc.info.Author = 'Para Sports Organization';
  doc.info.Subject = 'Official Player Identification Card';
  doc.info.Creator = 'Para Sports ID Card Generator';
  doc.info.Producer = 'PDFKit';
  doc.font('Helvetica');
};

const addCardBorder = (doc) => {
  doc.save();
  doc.roundedRect(10, 10, 630, 380, 18).lineWidth(4).stroke('#2a5298');
  doc.restore();
};

const addHeaderSection = (doc) => {
  // Blue header bar
  doc.save();
  doc.rect(10, 10, 630, 60).fill('#2a5298');
  doc.restore();
  // Logo
  try {
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 28, 18, { width: 44, height: 44 });
    }
  } catch {}
  // Title
  doc.font('Helvetica-Bold').fontSize(26).fill('#fff')
    .text('PARA SPORTS ID CARD', 90, 22, { width: 400, align: 'left' });
  // Subtitle
  doc.font('Helvetica').fontSize(12).fill('#e0e7ef')
    .text('Official Player Identification', 90, 48, { width: 400, align: 'left' });
};

const addWatermarkLogo = async (doc) => {
  try {
    if (fs.existsSync(logoPath)) {
      doc.save();
      doc.opacity(0.07);
      doc.image(logoPath, 325, 120, { width: 300, height: 200 });
      doc.opacity(1);
      doc.restore();
    }
  } catch {}
};

const addPlayerPhoto = async (doc, player) => {
  // Photo on the left side
  const photoX = 30, photoY = 75, photoSize = 100;
  doc.save();
  doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 6).fill('#ffffff').opacity(0.95);
  doc.restore();
  doc.save();
  doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2).clip();
  if (player.profilePhoto) {
    try {
      const photoPath = path.join(__dirname, '..', player.profilePhoto);
      if (fs.existsSync(photoPath)) {
        doc.image(photoPath, photoX, photoY, { width: photoSize, height: photoSize, cover: [photoSize, photoSize] });
      } else {
        drawDefaultAvatar(doc, photoX, photoY, photoSize);
      }
    } catch { drawDefaultAvatar(doc, photoX, photoY, photoSize); }
  } else {
    drawDefaultAvatar(doc, photoX, photoY, photoSize);
  }
  doc.restore();
  doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2 + 2).lineWidth(2).stroke('#2a5298');
};

const drawDefaultAvatar = (doc, x, y, size) => {
  doc.circle(x + size / 2, y + size / 2, size / 2).fill('#cccccc');
  doc.font('Helvetica-Bold').fontSize(12).fill('#666666')
    .text('NO PHOTO', x, y + size / 2 - 10, { align: 'center', width: size });
};

const addSectionHeader = (doc, label, x, y) => {
  doc.font('Helvetica-Bold').fontSize(12).fill('#2a5298').text(label, x, y);
};

// Helper to truncate long fields
const truncate = (str, n) => str && str.length > n ? str.slice(0, n - 1) + '…' : str;

const addPlayerDetails = (doc, player) => {
  // Left column: personal details under photo
  const leftX = 30, leftY = 185, leftW = 120;
  let ly = leftY;
  doc.font('Helvetica-Bold').fontSize(15).fill('#1e3c72')
    .text(`${player.firstName} ${player.lastName}`, leftX, ly, { width: leftW, align: 'center' });
  ly += 18;
  doc.font('Helvetica').fontSize(10).fill('#333')
    .text(`Player ID: ${player.playerId}`, leftX, ly, { width: leftW, align: 'center' });
  ly += 13;
  doc.text(`Gender: ${player.gender}`, leftX, ly, { width: leftW, align: 'center' });
  ly += 13;
  doc.text(`DOB: ${formatDate(player.dateOfBirth)}`, leftX, ly, { width: leftW, align: 'center' });
  ly += 13;
  doc.text(`Age: ${player.dateOfBirth ? calculateAge(player.dateOfBirth) : 'N/A'}`, leftX, ly, { width: leftW, align: 'center' });
  ly += 13;

  // Right column: all other details
  const detailsX = 170, detailsY = 75;
  let y = detailsY;
  let fontSize = 10;
  let overflowed = false;
  const maxY = 370;
  const addLine = (text, opts = {}) => {
    if (overflowed) return;
    if (y > maxY) {
      overflowed = true;
      doc.font('Helvetica-Oblique').fontSize(9).fill('#b91c1c')
        .text('See full details online', detailsX, maxY - 10, { width: 420 });
      return;
    }
    doc.font('Helvetica').fontSize(fontSize).fill('#222')
      .text(text, detailsX, y, opts);
    y += opts.lineHeight || 15;
  };
  const addHeader = (label) => {
    if (overflowed) return;
    if (y > maxY) {
      overflowed = true;
      doc.font('Helvetica-Oblique').fontSize(9).fill('#b91c1c')
        .text('See full details online', detailsX, maxY - 10, { width: 420 });
      return;
    }
    doc.font('Helvetica-Bold').fontSize(12).fill('#2a5298').text(label, detailsX, y);
    y += 18;
  };
  // Estimate if content is long, reduce font size if so
  let contentLength = 0;
  if (player.primarySport) contentLength += player.primarySport.length;
  if (player.coachName) contentLength += player.coachName.length;
  if (player.coachContact) contentLength += player.coachContact.length;
  if (player.disabilityType) contentLength += player.disabilityType.length;
  if (player.disabilityClassification) contentLength += player.disabilityClassification.length;
  if (player.address && player.address.street) contentLength += player.address.street.length + player.address.city.length + player.address.state.length + player.address.postalCode.length + player.address.country.length;
  if (player.emergencyContact && player.emergencyContact.name) contentLength += player.emergencyContact.name.length + (player.emergencyContact.relationship || '').length + (player.emergencyContact.phone || '').length;
  if (contentLength > 180) fontSize = 9;

  addHeader('Primary Sport');
  addLine(truncate(player.primarySport, 30));
  if (player.coachName || player.coachContact) {
    doc.font('Helvetica-Bold').fontSize(fontSize).fill('#2a5298').text('Coach', detailsX, y); y += 14;
    if (player.coachName) addLine(`Name: ${truncate(player.coachName, 30)}`);
    if (player.coachContact) addLine(`Contact: ${truncate(player.coachContact, 20)}`);
  }
  y += 5;
  addHeader('Disability');
  addLine(`Type: ${truncate(player.disabilityType, 30)}`);
  addLine(`Class: ${truncate(player.disabilityClassification, 20)}`);
  addHeader('Address');
  if (player.address && player.address.street) {
    // Address: wrap to 2 lines, 60 chars per line
    const fullAddr = `${player.address.street}, ${player.address.city}, ${player.address.state}, ${player.address.postalCode}, ${player.address.country}`;
    const addrLines = [];
    for (let i = 0; i < 2; i++) {
      if (fullAddr.length > i * 60) {
        addrLines.push(truncate(fullAddr.slice(i * 60, (i + 1) * 60), 60));
      }
    }
    addrLines.forEach(line => addLine(line));
  }
  addHeader('Emergency');
  if (player.emergencyContact && player.emergencyContact.name) {
    addLine(truncate(`${player.emergencyContact.name} (${player.emergencyContact.relationship || ''})`, 40));
    addLine(`Phone: ${truncate(player.emergencyContact.phone || '', 20)}`);
  }
};

const addFooter = (doc) => {
  const width = 650, height = 400;
  doc.rect(10, height - 50, 630, 40).fill('#2a5298');
  doc.font('Helvetica').fontSize(10).fill('#fff')
    .text(`Issued: ${formatDate(new Date())}`, 20, height - 40, { align: 'left', width: 200 });
  doc.font('Helvetica-Bold').fontSize(10).fill('#fff')
    .text('This is an official Para Sports ID Card', 0, height - 28, { align: 'center', width });
  doc.font('Helvetica').fontSize(8).fill('#fff')
    .text('Valid for official Para Sports events and competitions', 0, height - 15, { align: 'center', width });
  // Signature line
  doc.moveTo(480, height - 20).lineTo(620, height - 20).stroke('#b3d1ff').lineWidth(1);
  doc.font('Helvetica').fontSize(10).fill('#b3d1ff')
    .text('Authorized Signature', 480, height - 18, { width: 140, align: 'center' });
};

const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
};

// Clean up old ID cards periodically
export const cleanupOldIdCards = async () => {
  try {
    const files = await fs.promises.readdir(idCardsDir);
    const now = Date.now();
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    
    for (const file of files) {
      const filePath = path.join(idCardsDir, file);
      const stats = await fs.promises.stat(filePath);
      
      if (now - stats.mtime.getTime() > maxAge) {
        await fs.promises.unlink(filePath);
        console.log(`Cleaned up old ID card: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning up old ID cards:', error);
  }
};

// Run cleanup every 24 hours
setInterval(cleanupOldIdCards, 24 * 60 * 60 * 1000); 