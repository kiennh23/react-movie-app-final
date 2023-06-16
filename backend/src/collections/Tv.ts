import { S3UploadCollectionConfig } from "payload-s3-upload";

export const Tv: S3UploadCollectionConfig = {
    slug: "tv",
    upload: {
        staticURL: "/tv",
        staticDir: "tv",
        mimeTypes: ["video/*"],
        disableLocalStorage: true,
        s3: {
            bucket: "react-movie-bucket",
            prefix: "tv",
            commandInput: {
                ACL: "public-read",
            },
        },
        adminThumbnail: ({ doc }) =>
            `https://react-movie-bucket.s3.ap-southeast-1.amazonaws.com/tv/${doc.filename}`,
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
        },
        {
            name: "overview",
            type: "text",
        },
        {
            name: "img_cover",
            label: "Background",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "img_poster",
            label: "Poster",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "cast",
            type: "relationship",
            relationTo: "cast",
            hasMany: true,
        },
        {
            name: "videos",
            type: "array",
            label: "Video link",
            minRows: 1,
            maxRows: 3,
            labels: {
                singular: "Video",
                plural: "Videos",
            },
            fields: [
                {
                    name: "link",
                    type: "text",
                },
            ],
        },
        {
            name: "similar",
            type: "relationship",
            relationTo: "tv",
            hasMany: true,
        },
        {
            name: "genres",
            type: "relationship",
            relationTo: "genres",
            hasMany: true,
        },
        {
            name: "isPopular",
            label: "Popular",
            type: "checkbox",
            defaultValue: true,
        },
        {
            name: "isTopRated",
            label: "Top Rated",
            type: "checkbox",
            defaultValue: true,
        },
        {
            name: "isUpcoming",
            label: "Upcoming",
            type: "checkbox",
            defaultValue: true,
        },
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
                        `https://react-movie-bucket.s3.ap-southeast-1.amazonaws.com/tv/${doc.filename}`,
                ],
            },
        },
    ],
    endpoints: [
        {
            path: "/popular",
            method: "get",
            handler: async (req, res) => {
                const { payload } = req;

                const data = await payload.find({
                    collection: "tv",
                    where: {
                        isPopular: { equals: true },
                    },
                });

                res.status(200).json({
                    results: data?.docs ?? [],
                    page: data?.page ?? 0,
                    total_pages: data?.totalPages ?? 0,
                    total_results: data?.totalDocs ?? 0,
                });
            },
        },
        {
            path: "/top_rated",
            method: "get",
            handler: async (req, res) => {
                const { payload } = req;

                const data = await payload.find({
                    collection: "tv",
                    where: {
                        isTopRated: { equals: true },
                    },
                });

                res.status(200).json({
                    results: data?.docs ?? [],
                    page: data?.page ?? 0,
                    total_pages: data?.totalPages ?? 0,
                    total_results: data?.totalDocs ?? 0,
                });
            },
        },
        {
            path: "/upcoming",
            method: "get",
            handler: async (req, res) => {
                const { payload } = req;

                const data = await payload.find({
                    collection: "tv",
                    where: {
                        isTopRated: { equals: true },
                    },
                });

                res.status(200).json({
                    results: data?.docs ?? [],
                    page: data?.page ?? 0,
                    total_pages: data?.totalPages ?? 0,
                    total_results: data?.totalDocs ?? 0,
                });
            },
        },
        {
            path: "/search",
            method: "get",
            handler: async (req, res) => {
                const { payload } = req;
                const data = await payload.find({
                    collection: "tv",
                    where: {
                        title: { contains: req.query.query },
                    },
                });

                res.status(200).json({
                    results: data?.docs ?? [],
                    page: data?.page ?? 0,
                    total_pages: data?.totalPages ?? 0,
                    total_results: data?.totalDocs ?? 0,
                });
            },
        },
    ],
};

export default Tv;
