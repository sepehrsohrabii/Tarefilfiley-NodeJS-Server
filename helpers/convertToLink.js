function convertToLinkFormat(title) {
  // Convert the title to lowercase and replace spaces with dashes
  let link = title.toLowerCase().replace(/\s+/g, "-");

  // Remove any non-alphanumeric characters from the link
  link = link.replace(/[^a-z0-9-]/g, "");

  // Return the final link with a forward slash at the beginning
  return link;
}
module.exports = convertToLinkFormat;
