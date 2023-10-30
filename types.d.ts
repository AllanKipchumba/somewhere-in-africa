type Package = {
  id?: string;
  name: string;
  imageURL: string;
  price: number;
  description: string;
  tourDetails: string;
  includes?: string[];
  excludes?: string[];
};

type ListType = 'includes' | 'excludes';
type OperationType = 'push' | 'pop';

interface Lists {
  includes: string[];
  excludes: string[];
}
