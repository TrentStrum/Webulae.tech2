import { supabaseClient } from '../lib/supabaseClient';

export const DocumentsDataAccess = {
	async getAll() {
		const { data, error } = await supabaseClient
			.from('project_documents')
			.select(
				`
      *,
      profiles (username, full_name)
    `
			)
			.order('created_at', { ascending: false });

		if (error) throw new Error(error.message);
		return data;
	},
	async upload({ file, category }: { file: File; category: string }) {
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random()}.${fileExt}`;
		const filePath = `${category}/${fileName}`;

		const { error: uploadError } = await supabaseClient.storage
			.from('documents')
			.upload(filePath, file);

		if (uploadError) throw new Error(uploadError.message);

		// 2. Create database record
		const { data, error: insertError } = await supabaseClient
			.from('project_documents')
			.insert({
				name: file.name,
				category,
				file_url: filePath,
				file_type: file.type,
				project_id: '1',
				uploader_id: '1',
			})
			.select()
			.single();

		if (insertError) throw new Error(insertError.message);
		return data;
	},
};
