import { API_URL } from "../constants";

export const getAllProjectType = async () => {
    const response = await fetch(`${API_URL}/project-type`);
    return response.json();
};

export const deleteProjectType = async (projectTypeID: number) => {
    const response = await fetch(`${API_URL}/project-type/${projectTypeID}`, {
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

export const saveProjectType = async (projectType: any) => {
    const response = await fetch(`${API_URL}/project-type`, {
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

export const updateProjectType = async (projectType: any) => {
    const response = await fetch(`${API_URL}/project-type/${projectType.pt_id}`, {
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