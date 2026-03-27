# Albania Mindful Scene

A modern web application showcasing mindfulness and wellness events across Albania. This platform connects mind, body, and spirit through transformative experiences in Albania's most beautiful locations.

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Database**: Airtable (for event management)
- **Newsletter**: Beehive (for email subscriptions)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:pakufi-agency/albania-mindful-scene.git
cd albania-mindful-scene
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 Configuration

### Airtable Setup

1. Create an Airtable account
2. Set up a base with the following structure:
   - Event Name (Single line text)
   - Description (Long text)
   - Date (Date)
   - Location (Single line text)
   - Image (Attachments)
   - Contact Info (Email)

3. Get your API credentials from Airtable Developer Hub
4. Update your `.env` file with the credentials

### Customization

- **Colors**: Modify Tailwind config in `tailwind.config.js`
- **Fonts**: Update font families in `src/style.css`
- **Logo**: Replace logo in `src/assets/`

## 🌐 Deployment

The application is automatically deployed on Vercel when changes are merged to the main branch.

### Build for Production

```bash
npm run build
```

The build artifacts will be in the `dist` directory.

## 📊 Data Source

Event data is managed through Make Workflow, ensuring automated and real-time updates to the event listings.


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by [Pakufi](https://pakufi.agency) with love.

---

## 🔍 Troubleshooting

### Common Issues

**Q: Events are not loading**
A: Check your Make Workflow configuration and ensure data is being properly synced.

**Q: Styling issues**
A: Ensure all dependencies are installed and Tailwind CSS is properly configured.

**Q: Build fails**
A: Check for any syntax errors in Vue components and ensure all imports are correct.

### Support

For technical support, please open an issue on GitHub.
