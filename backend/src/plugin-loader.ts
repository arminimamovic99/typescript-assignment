import * as fs from 'fs';
import * as path from 'path';
import { Plugin } from './plugin';

const plugins: Plugin[] = [];

export function loadPlugins(pluginDirectory: string): void {
  const files = fs.readdirSync(pluginDirectory);

  files.forEach(file => {
    const pluginPath = path.join(pluginDirectory, file);
    const pluginModule = require(pluginPath);
    const plugin: Plugin = pluginModule.default;
    plugin.initialize();
    plugins.push(plugin);
    console.log(`Loaded plugin: ${plugin.name}`);
  });
}

export function getPlugins(): Plugin[] {
  return plugins;
}