import { transform } from '@babel/standalone';
//import { parser } from '@babel/parser';

export async function convertTypescriptToJs(tsxString: string) {
    try {
        const result = transform(tsxString, {
            presets: [
                ['typescript', { 
                    allExtensions: true, 
                    isTSX: true,  
                    useDefineForClassFields: false, 
                    allowNamespaces: true 
                }],
            ],
            filename: 'file.ts'
        });
        return result.code || null;
    } catch (error) {
        console.error('Error during TSX to JS conversion:', error);
        return null;
    }
}
