import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/src/lib/apiClient';
import { TimelineItem } from '@/src/types/timeline.types';

export const useProjectTimeline = (projectId: string) =>
	useQuery({
		queryKey: ['projectTimeline', projectId],
		queryFn: async () => {
			const response = await apiClient.get<TimelineItem[]>(`/projects/${projectId}/timeline`);
			return response;
		},
		enabled: !!projectId, // Only fetch if projectId is available
	});