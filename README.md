# JWT Decoder & Expiry Checker

> Free, open-source JWT decoder with live expiry countdown

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Features

- **Decode JWT Tokens** - Instantly decode header and payload
- **Live Countdown** - Real-time expiry countdown timer
- **Timezone Support** - Shows expiry in your local timezone
- **Visual Indicators** - Color-coded status (valid/expired/expiring soon)
- **Privacy First** - All decoding happens in your browser
- **Copy to Clipboard** - Quick copy for header/payload
- **Zero Dependencies** - Lightweight and fast

## 🚀 Demo

Try it live: [https://rashidv.dev/tools/jwt-decoder](https://rashidv.dev/tools/jwt-decoder)

## 📦 Installation

```bash
# npm
npm install @rashidv/jwt-decoder

# pnpm
pnpm add @rashidv/jwt-decoder

# yarn
yarn add @rashidv/jwt-decoder
```

## 🔧 Usage

### As a React Component

```tsx
import { JWTDecoder } from '@rashidv/jwt-decoder';

export default function MyPage() {
  return (
    <div>
      <h1>JWT Decoder</h1>
      <JWTDecoder />
    </div>
  );
}
```

### Using Individual Components

```tsx
import { TokenInput, DecodedView, ExpiryTimer } from '@rashidv/jwt-decoder';
import { decodeToken, validateToken } from '@rashidv/jwt-decoder';

// Your custom implementation
```

## 🎨 Styling

The components use Tailwind CSS classes. Make sure you have Tailwind CSS configured in your project.

## 📖 API

### `JWTDecoder`

Main component that includes all functionality.

### `TokenInput`

Input component for pasting JWT tokens.

**Props:**
- `onTokenChange: (token: string) => void` - Callback when token changes
- `error?: string` - Error message to display

### `DecodedView`

Displays decoded header and payload.

**Props:**
- `decoded: DecodedJWT` - Decoded JWT object

### `ExpiryTimer`

Shows expiry status and countdown.

**Props:**
- `validation: JWTValidation` - Validation result

### Utility Functions

```typescript
// Decode a JWT token
const decoded = decodeToken(token);

// Validate and check expiration
const validation = validateToken(decoded);

// Get time remaining
const timeRemaining = getTimeRemaining(validation.expiresAt);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT © [Muhammed Rashid](https://rashidv.dev)

## 🔗 Links

- **Live Demo:** [rashidv.dev/tools/jwt-decoder](https://rashidv.dev/tools/jwt-decoder)
- **GitHub:** [github.com/rashidrashiii/jwt-decoder](https://github.com/rashidrashiii/jwt-decoder)
- **npm:** [@rashidv/jwt-decoder](https://www.npmjs.com/package/@rashidv/jwt-decoder)

## 👨‍💻 Author

**Muhammed Rashid**
- Website: [rashidv.dev](https://rashidv.dev)
- GitHub: [@rashidrashiii](https://github.com/rashidrashiii)
- LinkedIn: [muhammed-rashid-v](https://linkedin.com/in/muhammed-rashid-v)

---

Made with ❤️ by [Rashid](https://rashidv.dev)
