<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ProShift Training

A high-end, aesthetic shift training tool for bartenders featuring scrollytelling, email, and text formats for cocktail education.

**Live Demo:** [castleproshift.vercel.app](https://castleproshift.vercel.app)

## Features

- 🍸 Interactive cocktail training interface
- 📚 Comprehensive product and cocktail database
- 🤖 AI-powered content generation using Gemini
- 📱 Responsive design with modern UI
- 🎨 Beautiful botanical-themed visualizations

## Run Locally

**Prerequisites:** Node.js 18+ and npm

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/castleproshift.git
   cd castleproshift
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   Get your API key from: https://aistudio.google.com/app/apikey

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Vercel

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add the `GEMINI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

The app will be available at `castleproshift.vercel.app`

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Google Gemini AI** - Content generation
- **Lucide React** - Icons

## Project Structure

```
├── components/        # React components
├── constants.tsx      # App data and constants
├── types.ts          # TypeScript type definitions
├── utils.ts          # Utility functions
├── prompts.ts        # AI prompt templates
└── App.tsx           # Main application component
```

## License

Private - All rights reserved
