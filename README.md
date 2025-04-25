# Data Collector App

A React Native mobile application built with Expo for collecting and managing personal information. This app provides a simple and intuitive interface for CRUD (Create, Read, Update, Delete) operations on people's data using SQLite for local storage.

## Features

- **View All Datas**: Browse through a list of all stored datas
- **Add New Datas**: Collect personal information with form validation
- **Contact Details**: View detailed information for each contact
- **Edit Information**: Update existing contact details with validation
- **Delete Datas**: Remove datas with confirmation dialog
- **Local Storage**: Data persists using SQLite database
- **Form Validation**: Ensures data integrity for email, phone numbers, and dates
- **Modern UI Design**: Clean and intuitive interface with responsive design

## Screenshots

### Home Screen
- Displays list of all datas
- Quick access to add new datas
- Tap any contact to view details

### Add/Edit Screen
- Form validation for:
  - Email format
  - Phone numbers (digits only)
  - Date format (YYYY-MM-DD)
- Required field: Full name
- Optional fields: Address, phone, email, city, date of birth, religion

### Detail Screen
- View complete contact information
- Edit and delete functionality
- Confirmation dialog before deletion

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (File-based routing)
- **Database**: Expo SQLite
- **State Management**: React Hooks
- **UI Components**: Custom styled components
- **Form Validation**: Custom validation functions

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data-collector-app.git
cd data-collector-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

4. Run the app:
- Scan the QR code with Expo Go (Android)
- Scan the QR code with Camera (iOS)
- Press 'a' for Android emulator
- Press 'i' for iOS simulator

## Project Structure

```
data-collector-app/
├── app/
│   ├── _layout.js          # App layout and navigation setup
│   ├── index.js            # Home screen with contact list
│   ├── add.js              # Add new contact screen
│   └── detail/
│       └── [id].js         # Contact detail screen
├── database/
│   └── database.js         # SQLite database operations
├── assets/                 # Images and static files
├── app.json               # Expo configuration
└── package.json           # Project dependencies
```

## Database Schema

The app uses SQLite with the following schema:

```sql
CREATE TABLE people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  address TEXT,
  phone_number TEXT,
  email TEXT,
  city_of_origin TEXT,
  date_of_birth TEXT,
  religion TEXT
);
```

## Key Components

### Database Operations
- `initDatabase()`: Initializes the SQLite database
- `addPerson()`: Adds a new contact
- `getAllPeople()`: Retrieves all datas
- `getPersonById()`: Retrieves a specific contact
- `updatePerson()`: Updates contact information
- `deletePerson()`: Deletes a contact

### Validation
- Email validation using regex pattern
- Phone number validation (digits only)
- Date format validation (YYYY-MM-DD)
- Required field validation for full name

## Future Enhancements

- [ ] Search functionality
- [ ] Sort and filter options
- [ ] Export/Import data feature
- [ ] Profile picture support
- [ ] Multiple phone numbers/emails per contact
- [ ] Categories/tags for datas
- [ ] Dark mode support
- [ ] Data backup to cloud

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI inspired by modern contact management apps
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)

## Authors

- **Muhammad Faza** - *Initial work* - [YourGitHub](https://github.com/muhFaza)

---

Made with ❤️ using React Native and Expo