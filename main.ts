import { Editor, MarkdownView, Plugin } from 'obsidian';
import { DateCommanderSettingTab } from './settings';


interface DateCommanderPluginSettings {
	prefixTemplate: string;
}

const DEFAULT_SETTINGS: Partial<DateCommanderPluginSettings> = {
	prefixTemplate: '# ',
};



export default class DateCommander extends Plugin {

	settings: DateCommanderPluginSettings;

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new DateCommanderSettingTab(this.app, this));

		this.addCommand({
			id: 'date-commander',
			name: 'current date',
			editorCallback: (editor: Editor, _: MarkdownView) => {
				const currentDate = new Date();
				const year = currentDate.getFullYear();
				const month = currentDate.getMonth() + 1; // Add 1 since month is 0-indexed
				const day = currentDate.getDate();

				// Use padStart to ensure two digits for month and day
				const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

				editor.replaceSelection(`${this.settings.prefixTemplate}${formattedDate}\n`);
			}
		});

	}

}
