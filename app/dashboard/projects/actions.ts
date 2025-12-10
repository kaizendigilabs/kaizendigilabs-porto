'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
    const supabase = await createServerClient();

    const services = formData.get('services') as string;
    const servicesArray = services ? services.split(',').map(s => s.trim()) : [];

    // Parse tech_stack from hidden input or construct it
    const techStackString = formData.get('tech_stack') as string;
    const techStackArray = techStackString ? techStackString.split(',').filter(Boolean) : [];

    const projectData = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        description: formData.get('description') as string,
        year: formData.get('year') as string,
        image_url: formData.get('image_url') as string,
        project_link: formData.get('project_link') as string,
        tech_stack: techStackArray,
        services: servicesArray,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
    };

    // 1. Insert Project
    const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

    if (projectError) {
        throw new Error(projectError.message);
    }

    // 2. Insert Testimonial
    const testimonialData = {
        project_id: project.id,
        name: formData.get('client_name') as string,
        role: formData.get('client_role') as string,
        company: formData.get('client_company') as string,
        content: formData.get('testimonial_content') as string,
        published: formData.get('testimonial_published') === 'true' || formData.get('testimonial_published') === 'on',
    };

    const { error: testimonialError } = await supabase
        .from('testimonials')
        .insert([testimonialData]);

    if (testimonialError) {
        // Ideally rollback project here, but for now just throw
        console.error('Failed to create testimonial for project:', project.id, testimonialError);
        // await supabase.from('projects').delete().eq('id', project.id); // Manual rollback attempt
        throw new Error(`Project created but testimonial failed: ${testimonialError.message}`);
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createServerClient();

    const services = formData.get('services') as string;
    const servicesArray = services ? services.split(',').map(s => s.trim()) : [];

    const techStackString = formData.get('tech_stack') as string;
    const techStackArray = techStackString ? techStackString.split(',').filter(Boolean) : [];

    const projectData = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        description: formData.get('description') as string,
        year: formData.get('year') as string,
        image_url: formData.get('image_url') as string,
        project_link: formData.get('project_link') as string,
        tech_stack: techStackArray,
        services: servicesArray,
        published: formData.get('published') === 'true' || formData.get('published') === 'on',
        updated_at: new Date().toISOString(),
    };

    // 1. Update Project
    const { error: projectError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);

    if (projectError) {
        throw new Error(projectError.message);
    }

    // 2. Update or Insert Testimonial
    const testimonialData = {
        name: formData.get('client_name') as string,
        role: formData.get('client_role') as string,
        company: formData.get('client_company') as string,
        content: formData.get('testimonial_content') as string,
        published: formData.get('testimonial_published') === 'true' || formData.get('testimonial_published') === 'on',
        updated_at: new Date().toISOString(),
    };

    // Try to update existing testimonial for this project
    const { data: existingTestimonial } = await supabase
        .from('testimonials')
        .select('id')
        .eq('project_id', id)
        .single();

    if (existingTestimonial) {
        const { error: updateError } = await supabase
            .from('testimonials')
            .update(testimonialData)
            .eq('id', existingTestimonial.id);
        
        if (updateError) throw new Error(updateError.message);
    } else {
        // Insert if not exists
        const { error: insertError } = await supabase
            .from('testimonials')
            .insert([{ 
                ...testimonialData, 
                project_id: id, 
                // published is already in testimonialData
            }]);
        
        if (insertError) throw new Error(insertError.message);
    }

    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

export async function deleteProject(id: string) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/projects');
    return { success: true };
}

export async function toggleProjectPublished(id: string, published: boolean) {
    const supabase = await createServerClient();

    const { error } = await supabase
        .from('projects')
        .update({ published, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/projects');
    return { success: true };
}
