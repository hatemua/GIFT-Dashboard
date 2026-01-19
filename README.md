# GIFT Platform Dashboard

A professional, enterprise-grade Next.js dashboard for the **GIFT Platform** (Gold International Fast Transfer) - a blockchain-based gold transaction and traceability system.

![GIFT Platform](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)

## 🌟 Overview

The GIFT Platform manages physical gold assets through NFT digital twins on a private L1 blockchain (Avalanche subnet). This dashboard provides a luxury fintech experience for managing:

- **Gold Assets (NFTs)** - Tokenized physical gold bars with full traceability
- **Transactions** - Cross-border gold transfers with multi-party approvals
- **Members** - GIFT ecosystem participants (banks, refineries, custodians)
- **Vault Management** - Secure storage facilities across multiple jurisdictions
- **Blockchain Explorer** - Real-time visibility into all on-chain activities

## 🎨 Design Philosophy

**Luxury Financial + Clean Swiss Design**

- Ultra-clean white/light theme with subtle warm gold accents
- Swiss design principles: precision typography, generous whitespace, grid-based layouts
- Professional & trustworthy: handles millions in gold transactions
- Responsive desktop-first design

### Color Palette

```css
Gold Accents: #D4AF37 (Primary), #B8960F, #F2CE5B
Neutrals: Warm grays (#FAFAFA to #1C1917)
Status: Success (#10B981), Warning (#F59E0B), Error (#EF4444)
```

### Typography

- **Display/Headings**: Plus Jakarta Sans
- **Body**: DM Sans
- **Monospace/Data**: JetBrains Mono

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 4.1+ |
| **Components** | shadcn/ui (customized) |
| **State Management** | Zustand + TanStack Query |
| **Charts** | Recharts |
| **Tables** | TanStack Table v8 |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |

## 📁 Project Structure

```
gift-dashboard/
├── app/
│   ├── (dashboard)/              # Dashboard routes
│   │   ├── layout.tsx            # Sidebar + Header wrapper
│   │   ├── dashboard/            # Main dashboard
│   │   ├── explorer/             # Blockchain explorer
│   │   ├── transactions/         # Transaction management
│   │   ├── assets/               # Asset & vault management
│   │   ├── traceability/         # Audit & provenance
│   │   ├── members/              # Member directory
│   │   ├── admin/                # Admin panel
│   │   └── billing/              # Billing & reports
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Redirects to /dashboard
│   └── globals.css               # Global styles + Tailwind
│
├── components/
│   ├── ui/                       # Base UI components (Button, Card, Badge, etc.)
│   ├── layout/                   # Layout components (Sidebar, Header, Shell)
│   ├── data-display/             # MetricCard, StatusBadge, DataTable
│   ├── blockchain/               # AddressDisplay, TxHash, NFTCard
│   ├── forms/                    # Complex form components
│   ├── charts/                   # Sparkline, GoldPriceChart
│   └── features/                 # Feature-specific components
│
├── lib/
│   ├── utils.ts                  # Utility functions (cn, formatters)
│   ├── mock-data.ts              # Mock data for development
│   ├── blockchain/               # Blockchain client utilities
│   ├── api/                      # API client
│   └── validations/              # Zod schemas
│
├── hooks/                        # Custom React hooks
├── stores/                       # Zustand stores
├── types/                        # TypeScript type definitions
├── constants/                    # Navigation, config
└── public/                       # Static assets
```

## 🔑 Key Features

### ✅ Implemented

- [x] **Dashboard Overview** - KPI metrics, recent transactions, activity feed
- [x] **Layout System** - Responsive sidebar navigation with header
- [x] **Component Library** - 15+ reusable UI components
- [x] **Mock Data** - Comprehensive mock data for all entities:
  - 5 GIFT Members (banks, refineries, custodians)
  - 25+ Gold Assets (NFTs)
  - 12+ Gold Accounts (IGANs)
  - 18+ Transactions (all status types)
  - 3 Vault Sites (Switzerland, UAE, UK)
  - 12+ Users with roles
- [x] **Type Safety** - Full TypeScript coverage, no `any` types
- [x] **Luxury Design** - Gold accents, Swiss typography, subtle shadows

### 🚧 Planned (Next Phase)

- [ ] **Blockchain Explorer** - Transaction, asset, and block explorer
- [ ] **Transaction Management** - Create, track, approve transactions
- [ ] **Asset Minting** - NFT minting workflow with form validation
- [ ] **Member Directory** - Member profiles and connections
- [ ] **Admin Panel** - User management, whitelist, configuration
- [ ] **Traceability** - Asset provenance chain visualization
- [ ] **Global Search** - ⌘K command palette
- [ ] **Real-time Updates** - WebSocket integration
- [ ] **Export** - CSV/Excel/PDF reports

## 🎯 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd gift-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Models

### Core Entities

| Entity | Description | Key Fields |
|--------|-------------|------------|
| **GiftMember** | GIFT ecosystem participant | `member_gic`, `type_member`, `member_roles`, `current_member_status` |
| **GoldAsset** | Tokenized gold bar (NFT) | `token_id`, `gift_bullion_id`, `weight_grams`, `fineness`, `asset_status` |
| **GoldAccount** | Gold holding account (IGAN) | `igan`, `holder_type`, `total_gold_assets`, `gold_account_status` |
| **TransactionOrder** | Gold transfer order | `transaction_reference`, `transaction_status`, `sender_igan`, `receiver_igan` |
| **VaultSite** | Physical vault facility | `vault_site_id`, `location`, `maximum_weight_ingold_kg` |

See [types/index.ts](types/index.ts) for complete type definitions.

## 🎨 Component Showcase

### MetricCard

```tsx
<MetricCard
  title="Total Gold Under Management"
  value="15.24 kg / $982,500"
  change={{ value: 8.2, trend: "up" }}
  sparklineData={[45, 52, 48, 65, 72]}
  icon={<Package />}
/>
```

### StatusBadge

```tsx
<StatusBadge status="In execution" />
<StatusBadge status="Settled" />
<StatusBadge status="IN_VAULT" />
```

### AddressDisplay

```tsx
<AddressDisplay
  address="0x7f8a9b3c5e4d6f2a1b8c9d0e3f5a7b4c"
  truncate={true}
/>
```

## 🔧 Configuration

### Tailwind Theme

Customize the luxury gold theme in `app/globals.css`:

```css
@theme {
  --color-gold-500: #D4AF37;
  --color-gold-600: #B8960F;
  /* ... */
}
```

### Navigation

Update sidebar navigation in `constants/navigation.ts`:

```typescript
export const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  // ...
];
```

## 📝 Development Guidelines

### Code Quality

- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Functional components with proper typing
- **Utilities**: Reusable functions in `lib/utils.ts`
- **Naming**: PascalCase for components, camelCase for functions

### Styling Principles

1. Use Tailwind utility classes
2. Custom classes only for complex patterns (scrollbars, glass effect)
3. Maintain consistent spacing (4px grid)
4. Follow the luxury fintech aesthetic

### File Organization

- One component per file
- Co-locate related files
- Use index files for cleaner imports
- Keep components under 200 lines

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Docker

```bash
docker build -t gift-dashboard .
docker run -p 3000:3000 gift-dashboard
```

## 📄 License

Proprietary - GIFT Platform

## 🤝 Contributing

This is a private enterprise project. For access or contributions, contact the GIFT Platform team.

---

**Built with ❤️ for the future of gold trading**

*"Where blockchain meets precious metals"*
