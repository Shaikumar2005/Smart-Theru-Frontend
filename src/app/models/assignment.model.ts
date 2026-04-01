import { Route } from './route.model';
import { Collector } from './collector.model';

export interface Assignment {
  id: number;
  route: Route;
  collector: Collector;
  assignedDate: string;
  completed: boolean;
}