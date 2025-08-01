const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config({ path: './config.env' });

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users (optional - comment out if you want to keep existing data)
    await User.deleteMany({});
    console.log('🧹 Cleared existing users');

    // Create demo users
    const demoUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        role: 'user'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin123',
        role: 'admin'
      },
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'Demo123',
        role: 'user'
      }
    ];

    for (const userData of demoUsers) {
      try {
        await User.createUser(userData);
        console.log(`✅ Created user: ${userData.email}`);
      } catch (error) {
        console.log(`⚠️  User ${userData.email} already exists or error: ${error.message}`);
      }
    }

    console.log('\n🎉 Database setup completed!');
    console.log('\n📋 Demo Users:');
    console.log('Email: john@example.com, Password: Password123');
    console.log('Email: admin@example.com, Password: Admin123');
    console.log('Email: demo@example.com, Password: Demo123');
    console.log('\n🚀 You can now start the server with: npm run dev');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase; 