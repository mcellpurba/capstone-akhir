import fs from 'fs';
let code = fs.readFileSync('d:\\capstone_final\\src\\pages\\Home.jsx', 'utf8');

code = code.replace(
  '<a href="#tentang-kami">Tentang Kami</a>\r\n          <a href="#testimoni">Testimoni</a>',
  '<a href="#testimoni">Testimoni</a>\r\n          <a href="#tentang-kami">Tentang Kami</a>'
);
code = code.replace(
  '<a href="#tentang-kami">Tentang Kami</a>\n          <a href="#testimoni">Testimoni</a>',
  '<a href="#testimoni">Testimoni</a>\n          <a href="#tentang-kami">Tentang Kami</a>'
);

const parts1 = code.split('      {/* About Us Section */}');
const beforeAboutUs = parts1[0];
const rest1 = '      {/* About Us Section */}' + parts1[1];

const parts2 = rest1.split('      {/* Testimonials Section */}');
const aboutUsSection = parts2[0];
const rest2 = '      {/* Testimonials Section */}' + parts2[1];

const parts3 = rest2.split('      {/* Footer Section */}');
const testimonialsSection = parts3[0];
const footerAndEnd = '      {/* Footer Section */}' + parts3[1];

const newCode = beforeAboutUs + testimonialsSection + aboutUsSection + footerAndEnd;

fs.writeFileSync('d:\\capstone_final\\src\\pages\\Home.jsx', newCode);
console.log("Sections swapped successfully");
