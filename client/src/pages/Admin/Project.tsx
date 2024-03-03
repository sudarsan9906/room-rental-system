// import { Divider } from "@mantine/core";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Project = () => {
//   const [data, setData] = useState([
//     { id: 1, title: "man power system" },
//     { id: 2, title: "virtuall vr/ar" },
//     { id: 3, title: "intelliante sytem" },
//   ]);

//   const deleteHandler = (id: any) => {
//     const deltedItem = data.filter((items) => {
//       return items.id !== id;
//     });

//     setData(deltedItem);
//   };

//   return (
//     <>
//   <div className="flex justify-between items-center my-4">
//     <h2 className="text-white">List of Projects</h2>

//     <Link to={"/dashboard/admin/clients/addclient"}>
//       <button className="p-1 rounded-sm hover:bg-slate-500 hover:text-white cursor-pointer">
//         Create Project
//       </button>
//     </Link>
//   </div>

//       <div className="flex gap-3">
//         {data.map((item) => {
//           return (
//             <div
//               key={item.id}
//               className="shadow-md bg-slate-200 p-4 rounded-md"
//             >
//               <h3 className=" ">{item.title}</h3>
//               <Divider label="" labelPosition="center" my="lg" />
//               <div className="flex justify-between gap-4 items-center">
//                 <button className="p-2 bg-green-300 cursor-pointer">
//                   edit
//                 </button>
//                 <button
//                   className="p-2 bg-red-300 cursor-pointer"
//                   onClick={() => deleteHandler(item.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Project;

import React, { useState } from "react";

import {
  Card,
  Avatar,
  Text,
  Progress,
  Badge,
  Group,
  ActionIcon,
  SimpleGrid,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
// import { MantineLogo } from '@mantinex/mantine-logo';

export default function TaskCard() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "man power system",
      description:
        "log  asdasd asdsdasd asdasdasda asdlkasdlasd asda sdasl;dkasldka",
    },
    {
      id: 2,
      title: "virtuall vr/ar",
      description:
        "logasdasd asdsdasd asdasdasda asdlkasdlasd asda sdasl;dkasldka",
    },
    {
      id: 3,
      title: "intelliante sytem",
      description:
        "log asdasd asdsdasd asdasdasda asdlkasdlasd asda sdasl;dkasldka",
    },
  ]);

  const deleteHandler = (id: any) => {
    const deltedItem = data.filter((items) => {
      return items.id !== id;
    });

    setData(deltedItem);
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-white">List of Projects</h2>

        <Link to={"/dashboard/admin/projects/createproject"}>
          <Button>Create Project</Button>
        </Link>
      </div>

      {data.length !== 0 ? (
        <SimpleGrid cols={3}>
          {data.map((item) => {
            return (
              <Card withBorder padding="lg" radius="md">
                <Group justify="space-between">
                  {/* <MantineLogo type="mark" size="2rem" /> */}
                  <Badge>12 days left</Badge>
                </Group>

                <Text fz="lg" fw={500} mt="md">
                  {item.title}
                </Text>
                <Text fz="sm" c="dimmed" mt={5}>
                  {item.description}
                </Text>

                <Text c="dimmed" fz="sm" mt="md">
                  Tasks completed:{" "}
                  <Text span fw={500} c="bright">
                    23/36
                  </Text>
                </Text>

                <Progress value={(23 / 36) * 100} mt={5} />

                <Group mt={15}>
                    <Link to={"/dashboard/admin/projects/editproject/" + item.id}>
                      <Button variant="light">Edit</Button>
                    </Link>
                  
                  <Button
                    onClick={() => deleteHandler(item.id)}
                    className="text-white bg-red-400"
                  >
                    Delete
                  </Button>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>
      ) : (
        <h2 className="text-center block">No Projects found!</h2>
      )}
    </>
  );
}
