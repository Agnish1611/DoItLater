import axios from "@/api/axiosConfig";
import TaskCalendar from "@/components/TaskCalendar";
import { userAtom } from "@/store/user";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import TaskCompleted from '../assets/task_images/task_completed.jpg';
import TodoTask from '../assets/task_images/todo_task.jpg';
import NotCompleted from '../assets/task_images/not_completed.jpg';
import Meetings from "@/components/Meetings";
import { Toaster } from "@/components/ui/toaster";

const Overview = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [skippedTasks, setSkippedTasks] = useState([]);

  const user = useRecoilValue(userAtom);

  useEffect(() => {
    axios.get('/tasks/'+'?user='+user.id+'&completed=true')
      .then((res) => {
        setCompletedTasks(res.data?.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  useEffect(() => {
    axios.get('/tasks/'+'?user='+user.id+'&completed=false')
      .then((res) => {
        setTodoTasks(res.data?.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  useEffect(() => {
    axios.get('/tasks/skipped')
      .then((res) => {
        setSkippedTasks(res.data?.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  return (
    <section className="w-full h-screen bg-zinc-950 flex gap-2 p-2 font-quicksand overflow-hidden">
        <div className="flex flex-col gap-2 h-full">
            <div className="h-[100rem] w-[60rem] rounded-3xl bg-white overflow-hidden p-5">
              <TaskCalendar />
            </div>
            <div className="flex h-full w-fit mt-0">
                <div className="h-full flex rounded-3xl mr-2 w-[19.7rem] items-center justify-between bg-zinc-900 p-7 text-white">
                  <div>
                    <div className="text-4xl font-bold my-2">{completedTasks.length}</div>
                    <div className="text-xl font-semibold">Tasks Completed</div>
                  </div>
                  <img src={TaskCompleted} className="h-32 w-32 rounded-full" />
                </div>
                <div className="h-full flex rounded-3xl mr-2 w-[19.7rem] items-center justify-between bg-zinc-900 p-10 text-white">
                  <div>
                    <div className="text-4xl font-bold my-2">{todoTasks.length - skippedTasks.length}</div>
                    <div className="text-xl font-semibold">To-do Tasks</div>
                  </div>
                  <img src={TodoTask} className="h-32 w-32 rounded-full" />
                </div>
                <div className="h-full flex rounded-3xl mr-2 w-[19.7rem] items-center justify-between bg-zinc-900 p-10 text-white">
                  <div>
                    <div className="text-4xl font-bold my-2">{skippedTasks.length}</div>
                    <div className="text-xl font-semibold">Tasks Skipped</div>
                  </div>
                  <img src={NotCompleted} className="h-32 w-32 rounded-full" />
                </div>
            </div>
        </div>
        <div className="h-full w-full bg-zinc-900 rounded-3xl p-5 overflow-hidden">
          <Meetings />
        </div>
        <Toaster />
    </section>
  )
}

export default Overview;