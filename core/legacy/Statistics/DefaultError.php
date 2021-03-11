<?php

namespace App\Legacy\Statistics;

use App\Entity\Statistic;
use App\Service\StatisticsProviderInterface;

class DefaultError implements StatisticsProviderInterface
{
    use StatisticsHandlingTrait;

    public const KEY = 'error';

    /**
     * @inheritDoc
     */
    public function getKey(): string
    {
        return self::KEY;
    }

    /**
     * @inheritDoc
     */
    public function getData(array $query): Statistic
    {
        return $this->getErrorResponse(self::KEY);
    }
}
