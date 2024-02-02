import ProjectState from "./components/project_state/ProjectState";
import ProjectTypes from "./components/project_type/ProjectTypes";

export const routes = [
    {
        path: "/projects-types",
        component :ProjectTypes
    },
    {
        path: "/projects-states",
        component :ProjectState
    }
]