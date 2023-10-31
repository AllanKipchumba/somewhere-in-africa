type Package = {
  id?: string;
  name: string;
  imageURL: string;
  price: number;
  description: string;
  tourDetails: string;
  includes: string[];
  excludes: string[];
};

type ListType = 'includes' | 'excludes';
type OperationType = 'push' | 'pop';

interface Lists {
  includes: string[];
  excludes: string[];
}

interface ListProps {
  list: string[];
  onRemoveItem: (item: string, packageType: string) => void;
  packageType: string;
}

type PackageType = 'includes' | 'excludes';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  itemsPerPage: number;
  totalItems: number;
}
