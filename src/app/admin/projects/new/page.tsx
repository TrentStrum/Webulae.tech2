'use client';

import { Card, CardHeader, CardTitle } from '@/src/components/ui/card';
import { ProjectForm } from '../components/ProjectForm';
import { useCreateProject } from '@/src/hooks/react-query/useProjects/useCreateProject';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/contexts/AuthContext';

export default function NewProjectPage() {
  const { createProject, isLoading } = useCreateProject();
  const { data: user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return null;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
        </CardHeader>
        <ProjectForm onSubmit={createProject} isSubmitting={isLoading} />
      </Card>
    </div>
  );
}