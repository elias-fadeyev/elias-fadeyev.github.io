import style from './styles/taskStyle.css';
import Task from './taskClass';
import RandomExpressionTask from './randomExpressionTask';
import TranslateTask from './translateTask';
import DragNDropTask from './dragNDropTask';
import ChooseMaxTask from './chooseMaxTask';
import ChooseTranslateTask from './chooseTranslateTask';
import { dictionary } from './dictionary';

const tasks = [RandomExpressionTask, TranslateTask, DragNDropTask, ChooseMaxTask, ChooseTranslateTask];

export { Task, tasks , dictionary};
