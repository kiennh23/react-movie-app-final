import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
    slug: "users",
    auth: true,
    admin: {
        useAsTitle: "username",
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [],
};

export default Users;
