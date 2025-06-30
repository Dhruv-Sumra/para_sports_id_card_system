# Para Sports ID Card Generator

A comprehensive MERN stack application for para sports organizations to register players, generate professional ID cards, and manage player information with automatic email delivery.

## 🏆 Features

### Core Functionality
- **Player Registration**: Comprehensive form for para sports athletes
- **ID Card Generation**: Automatic generation of professional ID cards with QR codes
- **Email Delivery**: Instant email delivery of generated ID cards
- **Player Management**: Complete CRUD operations for player data
- **Search & Filter**: Advanced search and filtering capabilities
- **Responsive Design**: Mobile-friendly interface

### Player Information Collected
- **Personal Details**: Name, date of birth, gender, contact information
- **Address Information**: Complete address details
- **Sports Information**: Primary/secondary sports, experience level, achievements
- **Disability Information**: Type, classification, and description
- **Medical Information**: Emergency contacts, conditions, medications, allergies
- **Profile Photo**: Upload and management of player photos

### Supported Para Sports
- Wheelchair Basketball, Tennis, Rugby
- Para Swimming, Athletics, Powerlifting
- Para Cycling, Table Tennis, Badminton
- Para Archery, Shooting, Judo, Taekwondo
- Para Rowing, Canoe, Triathlon
- Winter Sports: Alpine Skiing, Cross-Country, Snowboarding
- And many more...

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd para-sports-id-card
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/para-sports
   
   # Email Configuration (Gmail)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   
   # JWT Configuration (if needed for future authentication)
   JWT_SECRET=your-jwt-secret-key
   JWT_EXPIRE=30d
   
   # File Upload Configuration
   MAX_FILE_SIZE=5242880
   ```

5. **Start the Application**
   
   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
para-sports-id-card/
├── backend/
│   ├── models/
│   │   └── Player.js
│   ├── routes/
│   │   ├── playerRoutes.js
│   │   └── idCardRoutes.js
│   ├── utils/
│   │   ├── idCardGenerator.js
│   │   └── emailService.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── uploads/
│   ├── idcards/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── PlayerRegistration.jsx
│   │   │   ├── PlayerList.jsx
│   │   │   └── PlayerDetails.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated password in your `.env` file

### MongoDB Setup
- **Local MongoDB**: Install and run MongoDB locally
- **MongoDB Atlas**: Use cloud MongoDB service
- Update `MONGODB_URI` in `.env` file

## 📱 Usage

### Player Registration
1. Navigate to "Register Player" page
2. Fill out the comprehensive registration form
3. Upload a profile photo (optional)
4. Submit the form
5. ID card is automatically generated and sent via email

### Player Management
1. View all registered players in the "View Players" page
2. Search players by name, email, or player ID
3. Filter by sport or disability type
4. View detailed player information
5. Download or regenerate ID cards

### ID Card Features
- Professional design with organization branding
- Player photo integration
- QR code for quick verification
- Complete player information
- Automatic email delivery
- Download functionality

## 🛠️ API Endpoints

### Players
- `POST /api/players` - Register new player
- `GET /api/players` - Get all players (with pagination, search, filters)
- `GET /api/players/:id` - Get single player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player
- `POST /api/players/:id/regenerate-idcard` - Regenerate ID card

### ID Cards
- `GET /api/idcards/:playerId/download` - Download ID card
- `GET /api/idcards/:playerId/view` - View ID card
- `POST /api/idcards/:playerId/generate` - Generate ID card

## 🎨 Customization

### ID Card Design
Modify the ID card design in `backend/utils/idCardGenerator.js`:
- Change colors, fonts, and layout
- Add organization logo
- Customize information display
- Modify QR code styling

### Email Templates
Customize email templates in `backend/utils/emailService.js`:
- Update email subject and content
- Modify HTML styling
- Add organization branding

### Frontend Styling
Update styles in `frontend/src/App.css`:
- Change color scheme
- Modify layout and components
- Add custom animations

## 🔒 Security Features

- Input validation and sanitization
- File upload restrictions
- Error handling and logging
- CORS configuration
- Environment variable protection

## 📊 Database Schema

The Player model includes:
- Personal information (name, DOB, gender, contact)
- Address details
- Sports information (primary/secondary, experience)
- Disability classification
- Medical information
- Emergency contacts
- Profile photo and ID card status

## 🚀 Deployment

### Backend Deployment
1. Set up a production MongoDB instance
2. Configure environment variables
3. Set up email service credentials
4. Deploy to platforms like:
   - Heroku
   - DigitalOcean
   - AWS
   - Railway

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates and Maintenance

- Regular security updates
- Feature enhancements
- Bug fixes
- Performance optimizations

---

**Built with ❤️ for the Para Sports Community** 