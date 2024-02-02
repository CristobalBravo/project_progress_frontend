import { API_URL } from "../constants";


export const getAllProjectState = async () => {
    const response = await fetch(`${API_URL}/project-state`);
    return response.json();
};

export const deleteProjectState = async (projectTypeID: number) => {
    const response = await fetch(`${API_URL}/project-state/${projectTypeID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }

    return response.json();
};

export const saveProjectState  = async (projectType: any) => {
    const response = await fetch(`${API_URL}/project-state`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectType),
    });

    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }

    return response.json();
};

export const updateProjectState  = async (projectType: any) => {
    const response = await fetch(`${API_URL}/project-state/${projectType.ps_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectType),
    });
    if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
    }

    return response.json();
};