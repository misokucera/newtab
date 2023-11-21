rm -rf .next/ out/;

next build;

mv ./out/_next ./out/next
sed -i -e 's|/_next|/next|g' out/**.html out/next/static/css/**.css
