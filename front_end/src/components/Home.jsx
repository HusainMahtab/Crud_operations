import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DeleteIcon, EditIcon,Search2Icon } from '@chakra-ui/icons';
import { Button, HStack, Heading, Stack,Input } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from './Loader';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading,setLoading]=useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/users/allusers');
        setUsers(response.data.data);
        setLoading(false)
        console.log('Response Status:', response.status);
        console.log('Data:', response.data);
      } catch (error) {
        console.log('Error while Fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const editHandler = (userToUpdate) => {
    navigate('/update_user', { state: { userToUpdate } });
  };

  const deleteHandler = async (_id) => {

    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => console.log('Delete canceled'),
        },
        {
          label: 'Delete',
          onClick: async() => {
            // Implement your delete logic here
            try {
              const deleteUser = await axios.delete(`/api/v1/users/delete_user/${_id}`);
              console.log('deleted User:', deleteUser);
              console.log('username', deleteUser.data.data.deletedUser.userName);
        
              setUsers((preUser) => preUser.filter((e) => e._id !== _id));
        
              toast.success(`${deleteUser.data.data.deletedUser.userName},User deleted Successfully !`, {
                position: 'top-center',
                autoClose: 800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });

            } catch (error) {
              console.error('Error while Deleting User');
            }
            console.log('Item deleted');
          },
        },
      ],
    });

  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
 const filteredUsers = users.filter((user) => {
  const phoneNumber = String(user.phoneNumber); 
  return (
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (typeof phoneNumber === 'string' && phoneNumber.includes(searchQuery))
  );
});

  return (
    <>
      <ToastContainer />

      <HStack w={["full","full"]} justifyContent={"center"}>
        <Input
        width={["full","50%"]}
        type="text"
        placeholder={"Search here..."}
        w={"50%"}
        p={"8"}
        my={"8"}
        boxShadow={"dark-lg"}
        rounded={"md"}
        fontFamily={"cursive"}
        fontWeight={"500"}
        fontSize={"larger"}
        autoFocus={true}
        value={searchQuery}
        onChange={handleSearch}
      />
      </HStack>

      {
        loading ? (<Loader/>) : (
           filteredUsers.map((user) => (
           <UserCard
            _id={user._id}
            Name={user.userName}
            Email={user.email}
            Phone={user.phoneNumber}
            editHandler={() => editHandler(user)}
            deleteHandler={deleteHandler}
            key={user._id}
        />
      ))
        )
      }
     
    </>
  );
}

export const UserCard = ({ _id, Name, Email, Phone, editHandler, deleteHandler }) => {
  return (
    <Stack 
    w={['90%',"100%"]} 
    alignItems={'center'} 
    paddingTop={'8'} 
    // direction={["row","column"]}
    >

      <Heading color={'black'} fontSize={'x-large'} fontFamily={'cursive'} >
        User Data
      </Heading>

      <HStack
        w={["full","80%"]}
        bg={'white'}
        boxShadow="lg"
        p="6"
        rounded="md"
        paddingTop={'4'}
        justifyContent={'center'}
        gap={'8'}
        height={["60","20"]}
        direction={["column","row"]}
      >
        <Heading 
        fontFamily={"cursive"} 
        w={"fit-content"} 
        fontSize={"large"} 
        fontWeight={"300"}
        >
        {`id: ${_id}`}

        </Heading>
        <Heading  
        fontFamily={"cursive"} 
        w={"fit-content"} 
        fontSize={"large"} 
        fontWeight={"300"}
        >
        {`Name: ${Name}`}
        </Heading>

        <Heading
        fontFamily={"cursive"} 
        w={"fit-content"} 
        fontSize={"large"} 
        fontWeight={"300"} 
        >
        {`Email: ${Email}`}
        </Heading>

        <Heading 
        fontFamily={"cursive"} 
        w={"fit-content"} 
        fontSize={"large"} 
        fontWeight={"300"}
        >
        {`Phone: ${Phone}`}
        </Heading>

        <Button 
        onClick={() => editHandler(_id)} 
        leftIcon={<EditIcon />} 
        colorScheme="green" 
        variant="solid" 
        position={"static"}
        >
          Edit
        </Button>

        <Button
          onClick={() => deleteHandler(_id)}
          leftIcon={<DeleteIcon />}
          colorScheme="red"
          variant={'solid'}
          position={"static"}
          value={_id}
        >
          Delete
        </Button>
      </HStack>
    </Stack>
  );
};

export default Home;
