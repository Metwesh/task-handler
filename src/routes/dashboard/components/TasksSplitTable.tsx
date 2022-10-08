import Loading from "../../../components/Loading";
import "../../../components/Rating.css";
import { ITasks } from "../../tasks/components/TasksTable";
import "./TasksSplitTable.css";

export default function TasksSplitTable(props: {
  loading: boolean;
  incompleteTasks: Array<ITasks>;
}): JSX.Element {
  function compareDate(date: Date) {
    const differenceInTime = date.getTime() - new Date().getTime();

    // To calculate the no. of days between two dates
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }

  props.incompleteTasks.length > 0 &&
    props.incompleteTasks.forEach((taskInfo) => {
      const taskDeadline = new Date(taskInfo.deadline);
      if (compareDate(taskDeadline) > 7) return (taskInfo.priority = 5);
      else if (compareDate(taskDeadline) > 5 && compareDate(taskDeadline) < 7)
        return (taskInfo.priority = 4);
      else if (compareDate(taskDeadline) > 3 && compareDate(taskDeadline) < 5)
        return (taskInfo.priority = 3);
      else if (compareDate(taskDeadline) > 0) return (taskInfo.priority = 2);
      else if (compareDate(taskDeadline) === 0) return (taskInfo.priority = 1);
      else if (compareDate(taskDeadline) < 0) return (taskInfo.priority = 0);
    });
  return (
    <div className="d-grid grid-tasks-split">
      {/* Table 1 */}
      <div className="rounded-3 me-3 grid-format grid-area-table1">
        <table className="table table-hover rounded-start table-border-collapse">
          <thead>
            <tr className="row-header-thick">
              <th scope="col">Past due</th>
            </tr>
          </thead>
          <tbody>
            {props.loading && (
              <tr className="height-197">
                <td colSpan={4} className="fs-5 text-center no-hover">
                  <Loading />
                </td>
              </tr>
            )}
            {(props.incompleteTasks.find(
              (element) => element.priority === 0
            ) === undefined ||
              props.incompleteTasks.length === 0) &&
            !props.loading ? (
              <tr>
                <td className="fw-light fst-italic">No tasks past due</td>
              </tr>
            ) : (
              props.incompleteTasks.length > 0 &&
              !props.loading &&
              props.incompleteTasks.map((taskInfo) => {
                if (taskInfo.priority !== 0) return false;
                else
                  return (
                    <tr key={taskInfo._id} className="warning pointer">
                      <td>{taskInfo.task}</td>
                    </tr>
                  );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Table 2 */}
      <div className="rounded-3 grid-format grid-area-table2">
        <table className="table table-hover rounded-start table-border-collapse">
          <thead>
            <tr className="row-header-thick">
              <th scope="col">Today</th>
            </tr>
          </thead>
          <tbody>
            {props.loading && (
              <tr className="height-197">
                <td colSpan={4} className="fs-5 text-center no-hover">
                  <Loading />
                </td>
              </tr>
            )}
            {(props.incompleteTasks.find(
              (element) => element.priority === 1
            ) === undefined ||
              props.incompleteTasks.length === 0) &&
            !props.loading ? (
              <tr>
                <td className="fw-light fst-italic">No tasks for today</td>
              </tr>
            ) : (
              props.incompleteTasks.length > 0 &&
              !props.loading &&
              props.incompleteTasks.map((taskInfo) => {
                if (taskInfo.priority !== 1) return false;
                else
                  return (
                    <tr key={taskInfo._id} className="pointer">
                      <td>{taskInfo.task}</td>
                    </tr>
                  );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Table 3 */}
      <div className="rounded-3 ms-3 grid-format grid-area-table3">
        <table className="table table-hover rounded-start table-border-collapse">
          <thead>
            <tr className="row-header-thick">
              <th scope="col">This week</th>
            </tr>
          </thead>
          <tbody>
            {props.loading && (
              <tr className="height-197">
                <td colSpan={4} className="fs-5 text-center no-hover">
                  <Loading />
                </td>
              </tr>
            )}
            {(props.incompleteTasks.find(
              (element) => element.priority >= 2 && element.priority < 4
            ) === undefined ||
              props.incompleteTasks.length === 0) &&
            !props.loading ? (
              <tr>
                <td className="fw-light fst-italic">No tasks for this week</td>
              </tr>
            ) : (
              props.incompleteTasks.length > 0 &&
              !props.loading &&
              props.incompleteTasks.map((taskInfo) => {
                if (taskInfo.priority < 2) return false;
                else
                  return (
                    <tr key={taskInfo._id} className="pointer">
                      <td>{taskInfo.task}</td>
                    </tr>
                  );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
