import { S3UploadCollectionConfig } from "payload-s3-upload";

export const Media: S3UploadCollectionConfig = {
    slug: "media",
    upload: {
        staticURL: "/media",
        staticDir: "media",
        mimeTypes: ["image/*"],
        disableLocalStorage: true,
        s3: {
            bucket: "react-movie-bucket",
            prefix: "media",
            commandInput: {
                ACL: "public-read",
            },
        },
        adminThumbnail: ({ doc }) =>
            `https://react-movie-bucket.s3.ap-southeast-1.amazonaws.com/media/${doc.filename}`,
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: "url",
            type: "text",
            access: {
                read: () => true,
            },
            admin: {
                disabled: true,
            },
            hooks: {
                afterRead: [
                    ({ data: doc }) =>
                        `https://react-movie-bucket.s3.ap-southeast-1.amazonaws.com/media/${doc.filename}`,
                ],
            },
        },
    ],
};

export default Media;
