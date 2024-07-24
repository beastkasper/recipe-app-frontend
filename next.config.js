/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: function (config, options) {
        if (!config.watchOptions) {
            config.watchOptions = {
                aggregateTimeout: 5,
                ignored: [ '**/node_modules/**', '**/.git/**', '**/.next/**' ]
            };
        }
        return config;
    },
    experimental: {
        /* appDir: true, */
        instrumentationHook: true
    }
};
/*
process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error);
});
*/
module.exports = nextConfig