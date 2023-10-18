rm -rf .next/ out/;

next build;
next export;

mv ./out/_next ./out/next
sed -i -e 's|/_next|./next|g' out/**.html
