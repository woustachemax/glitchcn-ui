import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'components', 'ui');
const registryDir = path.join(process.cwd(), 'registry', 'glitchcn');
const libDir = path.join(process.cwd(), 'lib');

const componentDeps: Record<string, string[]> = {
  accordion: ['@radix-ui/react-accordion'],
  alert: ['class-variance-authority'],
  badge: ['@radix-ui/react-slot', 'class-variance-authority'],
  button: ['@radix-ui/react-slot', 'class-variance-authority'],
  card: [],
  checkbox: ['@radix-ui/react-checkbox'],
  collapsible: ['@radix-ui/react-collapsible'],
  command: ['cmdk', '@radix-ui/react-dialog'],
  dialog: ['@radix-ui/react-dialog', '@radix-ui/react-icons'],
  input: [],
  'input-otp': ['input-otp'],
  progress: ['@radix-ui/react-progress'],
  separator: ['@radix-ui/react-separator'],
  sheet: ['@radix-ui/react-dialog', 'class-variance-authority'],
  sidebar: ['@radix-ui/react-separator', '@radix-ui/react-slot', 'class-variance-authority'],
  skeleton: [],
  spinner: ['class-variance-authority', 'lucide-react'],
  table: [],
  tabs: ['@radix-ui/react-tabs'],
  tooltip: ['@radix-ui/react-tooltip'],
};

// Other glitchcn components a component imports, so the shadcn CLI installs them too.
const componentRegistryDeps: Record<string, string[]> = {
  command: ['@glitchcn/dialog'],
  sidebar: ['@glitchcn/button', '@glitchcn/input', '@glitchcn/separator', '@glitchcn/sheet', '@glitchcn/skeleton', '@glitchcn/tooltip'],
};

// Extra non-component files a component needs.
const componentExtraFiles: Record<string, { path: string; type: string }[]> = {
  sidebar: [{ path: 'hooks/use-mobile.ts', type: 'registry:hook' }],
};

const baseDeps: string[] = ['clsx', 'tailwind-merge', 'lucide-react'];

const utilsContent = fs.readFileSync(path.join(libDir, 'utils.ts'), 'utf8');

const componentFiles = fs.readdirSync(componentsDir);

componentFiles.forEach((file: string) => {
  if (!file.endsWith('.tsx')) return;
  
  const componentName = file.replace('.tsx', '');
  const componentPath = path.join(componentsDir, file);
  const content = fs.readFileSync(componentPath, 'utf8');
  
  const registryData = {
    name: componentName,
    type: 'registry:ui',
    dependencies: [...baseDeps, ...(componentDeps[componentName] || [])],
    devDependencies: [],
    registryDependencies: componentRegistryDeps[componentName] || [],
    files: [
      {
        path: `components/ui/${file}`,
        content: content,
        type: 'registry:ui',
        target: `components/ui/${file}`
      },
      {
        path: 'lib/utils.ts',
        content: utilsContent,
        type: 'registry:lib',
        target: 'lib/utils.ts'
      },
      ...(componentExtraFiles[componentName] || []).map((extra) => ({
        path: extra.path,
        content: fs.readFileSync(path.join(process.cwd(), extra.path), 'utf8'),
        type: extra.type,
        target: extra.path,
      })),
    ],
    tailwind: {
      config: {
        theme: {
          extend: {}
        }
      }
    }
  };
  
  const outputPath = path.join(registryDir, `${componentName}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(registryData, null, 2));
  console.log(componentName);
});

console.log('done');