import ExerciseHome from "../../modules/exercises/ExerciseHome/ExerciseHome";
import { Route } from "../routes";

export const exercisesRoutes: Route[] = [
  {name: 'ExercisesHome', component: ExerciseHome},
  {name: 'ExerciseDetails', component: (/* ExerciseDetails */) => null},
  {name: 'EvaluateExercise', component: (/* EvaluateExercise */) => null},
];