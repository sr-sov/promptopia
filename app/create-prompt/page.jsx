'use client';

import React from 'react'
import { useState } from 'react';
import { useRoute } from 'next/router';
import { useRouter } from 'next/router';

import Form from '@components/Form';

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e) => {
        e.preventDefault(); //prevent reload to maintain a "native" feel
        setSubmitting(true); //we can use as some sort of "loader" later on

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: sessionStorage.user.id,
                    tag: post.tag
                })
            })
        } catch (error) {

        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt