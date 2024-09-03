export type Component = {
  name: string;
  amountPerKg: number;
};

export type Recipe = {
  id: string;
  name: string;
  components: Component[];
};
