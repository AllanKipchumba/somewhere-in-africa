export default function filterPackageBySearch(data: Package[], search: string) {
  const searchedPackage = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return searchedPackage;
}
