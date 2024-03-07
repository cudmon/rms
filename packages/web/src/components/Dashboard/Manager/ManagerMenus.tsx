"use client";
import React from "react";
import { useState } from "react";

import {
    Container, Group, ActionIcon, SimpleGrid, Card, Text, Image,
    Button, rem, TextInput, Textarea, Tooltip, Title, NumberInput,
    Divider, Modal, Box ,
  } from '@mantine/core';
import { useDisclosure,} from "@mantine/hooks";
import { useForm } from '@mantine/form';
import {
     IconEdit, IconCoins, IconUpload,
    IconX, IconPhotoDown, IconSalad, IconAlignBoxLeftTop,
    
  } from '@tabler/icons-react';
import { Dropzone,  IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import classes from "@/app/dashboard/css/HeaderSimple.module.css";
import Link from "next/link";

import {Menu} from "@/types/entity";
import { IconSearch } from "@tabler/icons-react";





  export const ManagerMenus = ({food}: { food:Menu[] }) => {

    const [search, setSearch] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };
  
    const filteredRows = food.filter(food =>
      food.name.toLowerCase().includes(search.toLowerCase()) 
      // ||
      // food.detail.toLowerCase().includes(search.toLowerCase())

    );
     
      const [opened, { open, close }] = useDisclosure(false);

        const cards = filteredRows.map((food) => (
        <div key={food.id}>
          <Card padding="lg" radius="xs" className={classes.card} withBorder>
            <Card.Section component="a" withBorder>
              <Tooltip label={food.name} position="top" offset={5}>
                <Image radius="md" src="" height={160} width={160} alt="Food Image" />
              </Tooltip>
            </Card.Section>
    
            <Group justify="space-between" mt="md" mb="xs" >
              <Text fw={750} className={classes.colorText}>{food.name}</Text>
              <Tooltip label="Edit" arrowOffset={30} arrowSize={4} withArrow>
                <ActionIcon variant="default" aria-label="Settings" size={22} onClick={open}>
                  <IconEdit style={{ width: '75%', height: '75%' }} />
                </ActionIcon>
              </Tooltip>
            </Group>
    
            <Text size="sm" c="dimmed">
              {food.detail}
            </Text>
    
            <Text size="sm" c="dimmed">
              {food.price}
            </Text>
          </Card>
        </div>
    
      ))
    
      const form = useForm({
        initialValues: {
          name: '',
          price: 0.0,
        },
    
        
      });
    
      return (
        <>
    
         
    
          <Container my="md">
            <Title order={3} size="h1" fw={900} ta="center" c="black">
              MENU
            </Title>
            <Text ta="center" c="dimmed" my='md' fw={750}>Menu List</Text>

              
          <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />

            <SimpleGrid cols={3} spacing="xl" verticalSpacing="xl" mt='xl'>
              {cards}
            </SimpleGrid>
          </Container>

    
          {/*-------------------------------------------- Modal Edit Menus ------------------------------------------------*/}
    
          <Modal opened={opened} onClose={close} title="Edit Menu" c="dimmed" size="lg">
            <Container>
              <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...food}>
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                  <Dropzone.Accept>
                    <IconUpload
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                      stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                      stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhotoDown
                      style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                      stroke={1.5} />
                  </Dropzone.Idle>
                  <div>
                    <Text size="xl" inline>
                      Pictures
                    </Text>
                  </div>
                </Group>
              </Dropzone>
    
              <Box component="form" onSubmit={form.onSubmit(() => { })}>
                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                  <TextInput
                    radius="md"
                    label="Food Name"
                    placeholder="Name..."
                    mt="sm"
                    c="black"
                    leftSection={<IconSalad size={16} />}
                    withAsterisk
                    {...form.getInputProps('name')}
                  />
    
                  <NumberInput
                    label="Prices"
                    placeholder="Prices..."
                    hideControls
                    mt="sm"
                    c="black"
                    leftSection={<IconCoins size={16} />}
                    withAsterisk
                    {...form.getInputProps('price')}
                  />
                </SimpleGrid>
    
                <Textarea
                  resize="vertical"
                  radius="md"
                  label="Food Detail"
                  description="Description"
                  placeholder="Detail..."
                  mt="sm"
                  c="black"
                  leftSection={<IconAlignBoxLeftTop size={16} />} />
    
                <Group justify="center" mt="md">
                  <Button variant="filled" color="green" radius="lg" mt="sm" type="submit">
                    Save
                  </Button>
                  <Button variant="filled" color="red" radius="lg" mt="sm" onClick={close} >
                    Delete
                  </Button>
                </Group>
              </Box>
            </Container>
          </Modal>
    
        </>
      );

  };
