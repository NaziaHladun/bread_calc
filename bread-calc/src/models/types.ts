export type Component = {
  name: string;
  amountPerKg: number;
};

export type Recipe = {
  id: number;
  name: string;
  components: Component[];
};
