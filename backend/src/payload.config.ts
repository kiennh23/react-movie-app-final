import { buildConfig } from "payload/config";
import { S3Client } from "@aws-sdk/client-s3";
import s3Upload from "payload-s3-upload";
import path from "path";

import Movie from "./collections/Movie";
import Users from "./collections/Users";
import Cast from "./collections/Cast";
import Media from "./collections/Media";
import Tv from "./collections/Tv";
import Genres from "./collections/Genre";

export default buildConfig({
    serverURL: process.env.SERVER_URL,
    admin: {
        user: Users.slug,
    },
    collections: [Tv, Movie, Cast, Genres, Media, Users],
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    },
    plugins: [
        s3Upload(
            new S3Client({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_KEY,
                    secretAccessKey: process.env.AWS_SECRET,
                },
            })
        ),
    ],
});
