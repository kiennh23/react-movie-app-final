import { CollectionConfig } from "payload/types";

const Cast: CollectionConfig = {
    slug: "cast",
    admin: {
        useAsTitle: "name",
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
            name: "name",
            type: "text",
            label: "Caster name",
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            label: "Avatar",
            required: true,
        },
    ],
};

export default Cast;
