'use client';

import { Button } from '@heroui/button';
import { Heart } from 'lucide-react';
import { Tooltip } from '@heroui/tooltip';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  isIconOnly?: boolean;
}

export default function FavoriteButton({
  isFavorite,
  onClick,
  size = 'md',
  isIconOnly = false,
}: FavoriteButtonProps) {
  return (
    <Tooltip
      color="default"
      content={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Button
        isIconOnly={isIconOnly}
        className={isFavorite ? 'text-red-500' : ''}
        color={isFavorite ? 'danger' : 'default'}
        variant={isFavorite ? 'flat' : 'bordered'}
        size={size}
        onClick={onClick}
      >
        <Heart
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
          fill={isFavorite ? 'currentColor' : 'none'}
        />
      </Button>
    </Tooltip>
  );
}
