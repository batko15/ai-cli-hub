# GitHub Copilot Custom Instructions

## Project Context

This is a modern full-stack web application with AI capabilities. The project follows best practices for maintainable, scalable code.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM
- **AI**: z-ai-web-dev-sdk

## Coding Conventions

### TypeScript

```typescript
// ✅ Good: Use interfaces for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Good: Use const assertions
const ROLES = ['admin', 'user', 'guest'] as const;

// ✅ Good: Avoid any, use unknown
function parse(input: unknown): Result {
  // Validate input before using
}

// ❌ Bad: Using any
function parse(input: any): Result {
  return input; // Unsafe
}
```

### React Components

```tsx
// ✅ Good: Functional component with proper typing
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={cn('base-styles', variants[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ✅ Good: Server Component by default
async function UserProfile({ userId }: { userId: string }) {
  const user = await getUser(userId);
  return <ProfileCard user={user} />;
}

// ✅ Good: Client Component when needed
'use client';
export function InteractiveForm() {
  const [state, setState] = useState(initialState);
  // ...
}
```

### API Routes

```typescript
// ✅ Good: Proper error handling and validation
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    
    // Process data
    
    return Response.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Styling

```tsx
// ✅ Good: Tailwind with responsive design
<div className="flex flex-col gap-4 p-4 md:flex-row md:p-6">
  <span className="text-sm md:text-base">Content</span>
</div>

// ✅ Good: Use cn() for conditional classes
import { cn } from '@/lib/utils';

<button className={cn(
  'base-button-styles',
  isActive && 'active-styles',
  className
)}>
```

## File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── api/               # API routes
│   └── page.tsx           # Pages
├── components/
│   ├── ui/                # shadcn/ui components
│   └── features/          # Feature components
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── db.ts              # Database client
│   └── api/               # API utilities
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── styles/
    └── globals.css        # Global styles
```

## Best Practices

### 1. Error Handling

```typescript
// ✅ Good: Comprehensive error handling
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  console.error('Operation failed:', error);
  
  if (error instanceof SpecificError) {
    return { success: false, error: 'Specific message' };
  }
  
  return { success: false, error: 'An unexpected error occurred' };
}
```

### 2. Testing

```typescript
// ✅ Good: Test critical functionality
describe('UserService', () => {
  it('should create a new user with valid data', async () => {
    const user = await createUser(validData);
    expect(user.id).toBeDefined();
    expect(user.email).toBe(validData.email);
  });
  
  it('should reject invalid email', async () => {
    await expect(createUser({ email: 'invalid' }))
      .rejects.toThrow('Invalid email');
  });
});
```

### 3. Security

```typescript
// ✅ Good: Never expose secrets
// Use environment variables
const apiKey = process.env.API_KEY;

// ✅ Good: Validate all inputs
import { z } from 'zod';
const validated = schema.parse(userInput);

// ✅ Good: Sanitize output
import { sanitizeHtml } from '@/lib/sanitize';
const safeHtml = sanitizeHtml(userContent);
```

### 4. Performance

```typescript
// ✅ Good: Use server components
async function ProductList() {
  const products = await getProducts(); // Server-side
  return products.map(p => <ProductCard key={p.id} product={p} />);
}

// ✅ Good: Lazy load heavy components
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});

// ✅ Good: Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort(compareFn),
  [items]
);
```

## Common Patterns

### Fetching Data

```typescript
// Server Component
async function DataComponent() {
  const data = await fetchData();
  return <Display data={data} />;
}

// Client Component with SWR/TanStack Query
function ClientDataComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
  
  if (isLoading) return <Skeleton />;
  if (error) return <Error message={error.message} />;
  return <Display data={data} />;
}
```

### Form Handling

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (data: FormData) => {
    // Handle submission
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Code Review Checklist

- [ ] TypeScript types are properly defined
- [ ] Error handling is comprehensive
- [ ] Code is readable and well-documented
- [ ] No hardcoded secrets or credentials
- [ ] Responsive design implemented
- [ ] Accessibility attributes added
- [ ] Tests cover critical paths
