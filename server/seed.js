const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Mobile',
    price: 999,
    stock: 50,
    specs: {
      ram: '8GB',
      storage: '256GB',
      processor: 'A17 Pro',
      battery: '3274 mAh'
    },
    rating: 4.8,
    description: 'The ultimate iPhone with a titanium design and the most powerful chip ever in a smartphone.',
    images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800']
  },
  {
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptop',
    price: 1299,
    stock: 30,
    specs: {
      ram: '16GB',
      storage: '512GB',
      processor: 'M3 Chip',
      battery: '18 hours'
    },
    rating: 4.9,
    description: 'Strikingly thin and fast, so you can work, play, or create anywhere.',
    images: ['https://images.unsplash.com/photo-1517336714460-4c5040097a1d?auto=format&fit=crop&q=80&w=800']
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Mobile',
    price: 1199,
    stock: 40,
    specs: {
      ram: '12GB',
      storage: '512GB',
      processor: 'Snapdragon 8 Gen 3',
      battery: '5000 mAh'
    },
    rating: 4.7,
    description: 'The new era of mobile AI is here. S24 Ultra is built for the future.',
    images: ['https://images.unsplash.com/photo-1707240316520-213c4103135c?auto=format&fit=crop&q=80&w=800']
  },
  {
    name: 'HP Spectre x360',
    brand: 'HP',
    category: 'Laptop',
    price: 1499,
    stock: 20,
    specs: {
      ram: '16GB',
      storage: '1TB',
      processor: 'Intel Core i7',
      battery: '15 hours'
    },
    rating: 4.6,
    description: 'Exquisite design meets powerful performance in this 2-in-1 convertible laptop.',
    images: ['https://images.unsplash.com/photo-1544006659-f0b21884cb1d?auto=format&fit=crop&q=80&w=800']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding...');
    
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products);
    
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
