'use client';
/// не готово треба ще storiesApi useStoriesStore useAuthModal
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import styles from './SaveStoryButton.module.css';



import { storiesApi } from '@/lib/api/clientApi';