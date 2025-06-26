import DateCommander from './main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export class DateCommanderSettingTab extends PluginSettingTab {
  plugin: DateCommander;

  constructor(app: App, plugin: DateCommander) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Date prefix')
      .setDesc('Prefix for date insertion')
      .addText((text) =>
        text
          .setPlaceholder('# ')
          .setValue(this.plugin.settings.prefixTemplate)
          .onChange(async (value) => {
            this.plugin.settings.prefixTemplate = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
