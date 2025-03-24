export const validateEmail = (email) => {
 const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return regex.test(email);
};

export const getInitials = (name) => {
 name = capitalize(name);
 let words = name.split(' ');
 if (words.length >= 2) {
  return (words[0][0] + words[1][0]).toUpperCase();
 } else {
  return name[0];
 }
};

export const capitalize = (name) => {
 return name.toUpperCase();
};
