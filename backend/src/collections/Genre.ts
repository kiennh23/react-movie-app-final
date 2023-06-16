import { CollectionConfig } from "payload/types";

const Genres: CollectionConfig = {
    slug: "genres",
    admin: {
        useAsTitle: "genres",
    },
    auth: true,
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: "id",
            type: "number",
            required: true,
        },
        {
            name: "genres",
            type: "text",
        },
    ],
};

export default Genres;
