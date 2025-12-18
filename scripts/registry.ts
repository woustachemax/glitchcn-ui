import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'components', 'ui');
const registryDir = path.join(process.cwd(), 'registry', 'glitchcn');
const libDir = path.join(process.cwd(), 'lib');

const componentDeps: Record<string, string[]> = {
  accordion: ['@radix-ui/react-accordion'],
  alert: ['class-variance-authority'],
  badge: ['class-variance-authority'],
  button: ['@radix-ui/react-slot', 'class-variance-authority'],
  card: [],
  command: ['cmdk', '@radix-ui/react-dialog'],
  dialog: ['@radix-ui/react-dialog', '@radix-ui/react-icons'],
  input: [],
  progress: ['@radix-ui/react-progress'],
  separator: ['@radix-ui/react-separator'],
  sheet: ['@radix-ui/react-dialog', 'class-variance-authority'],
  sidebar: ['@radix-ui/react-separator', '@radix-ui/react-slot'],
  skeleton: [],
  spinner: ['class-variance-authority', 'lucide-react'],
  table: [],
  tabs: ['@radix-ui/react-tabs'],
  tooltip: ['@radix-ui/react-tooltip'],
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
    registryDependencies: [],
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
      }
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