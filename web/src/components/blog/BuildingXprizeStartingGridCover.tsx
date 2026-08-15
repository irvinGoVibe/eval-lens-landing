import type { SVGProps } from "react";

type BuildingXprizeStartingGridCoverProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

export function BuildingXprizeStartingGridCover({
  className,
  title = "EvalLens entering a high-stakes starting grid",
  ...props
}: BuildingXprizeStartingGridCoverProps) {
  return (
    <svg
      className={className}
      {...props}
      width="1600"
      height="900"
      viewBox="0 0 1600 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="building-xprize-starting-grid-title"
    >
      <title id="building-xprize-starting-grid-title">{title}</title>
      <defs>
        <linearGradient
          id="xprize-grid-brand"
          x1="579"
          y1="318"
          x2="1009"
          y2="677"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6C4CF1" />
          <stop offset="0.34" stopColor="#A99BFF" />
          <stop offset="0.68" stopColor="#2EC5E8" />
          <stop offset="1" stopColor="#36E0C2" />
        </linearGradient>
        <linearGradient
          id="xprize-grid-glass-stroke"
          x1="482"
          y1="262"
          x2="1126"
          y2="680"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="0.43" stopColor="#CFC8FF" stopOpacity="0.56" />
          <stop offset="0.74" stopColor="#BDEFFF" stopOpacity="0.66" />
          <stop offset="1" stopColor="#DFFFF9" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient
          id="xprize-grid-unicorn-fill"
          x1="679"
          y1="349"
          x2="914"
          y2="641"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.58" />
          <stop offset="0.36" stopColor="#A99BFF" stopOpacity="0.28" />
          <stop offset="0.68" stopColor="#2EC5E8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#36E0C2" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="xprize-grid-scarlet"
          x1="114"
          y1="325"
          x2="476"
          y2="725"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FF9C92" />
          <stop offset="0.42" stopColor="#B91526" />
          <stop offset="1" stopColor="#6F111B" />
        </linearGradient>
        <linearGradient
          id="xprize-grid-silver"
          x1="1089"
          y1="320"
          x2="1463"
          y2="728"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.42" stopColor="#B9C0CA" />
          <stop offset="1" stopColor="#39414D" />
        </linearGradient>
        <linearGradient
          id="xprize-grid-tire"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0" stopColor="#4C4D55" />
          <stop offset="0.52" stopColor="#191B21" />
          <stop offset="1" stopColor="#07080B" />
        </linearGradient>
        <radialGradient
          id="xprize-grid-bg"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(800 238) rotate(90) scale(740 960)"
        >
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.36" stopColor="#FFFDF9" />
          <stop offset="0.73" stopColor="#F8F1EA" />
          <stop offset="1" stopColor="#EFE7DF" />
        </radialGradient>
        <radialGradient
          id="xprize-grid-forward-glow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(800 305) rotate(90) scale(258 368)"
        >
          <stop offset="0" stopColor="#36E0C2" stopOpacity="0.22" />
          <stop offset="0.32" stopColor="#A99BFF" stopOpacity="0.14" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="xprize-grid-track-glow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(800 605) rotate(90) scale(180 700)"
        >
          <stop offset="0" stopColor="#C7F8FF" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#F5ECFF" stopOpacity="0.12" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter
          id="xprize-grid-soft-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="18"
            stdDeviation="20"
            floodColor="#726B66"
            floodOpacity="0.16"
          />
        </filter>
        <filter
          id="xprize-grid-car-shadow"
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="26"
            stdDeviation="22"
            floodColor="#5F5149"
            floodOpacity="0.2"
          />
        </filter>
        <filter
          id="xprize-grid-glow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.42 0 0 0 0 0.30 0 0 0 0 0.95 0 0 0 0.22 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="xprize-grid-aqua-glow"
          x="-45%"
          y="-45%"
          width="190%"
          height="190%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="13" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.14 0 0 0 0 0.78 0 0 0 0 0.86 0 0 0 0.2 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="xprize-grid-left-crop">
          <rect x="0" y="260" width="560" height="560" rx="0" />
        </clipPath>
        <clipPath id="xprize-grid-right-crop">
          <rect x="1040" y="260" width="560" height="560" rx="0" />
        </clipPath>
      </defs>

      <rect width="1600" height="900" fill="url(#xprize-grid-bg)" />
      <rect width="1600" height="900" fill="url(#xprize-grid-forward-glow)" />
      <path
        d="M381 164H1219L1506 826H94L381 164Z"
        fill="#FFFFFF"
        fillOpacity="0.42"
      />
      <path
        d="M381 164H1219L1506 826H94L381 164Z"
        fill="url(#xprize-grid-track-glow)"
      />

      <g opacity="0.72" strokeLinecap="round">
        <path
          d="M388 170L104 824"
          stroke="#CFC7BF"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <path
          d="M1212 170L1496 824"
          stroke="#CFC7BF"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <path
          d="M590 172L456 824"
          stroke="#DCD4CB"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <path
          d="M800 172V824"
          stroke="#DCD4CB"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <path
          d="M1010 172L1144 824"
          stroke="#DCD4CB"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <path
          d="M338 264H1262"
          stroke="#D9D0C8"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <path
          d="M284 389H1316"
          stroke="#D9D0C8"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <path
          d="M221 536H1379"
          stroke="#D9D0C8"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        <path
          d="M154 693H1446"
          stroke="#D9D0C8"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      </g>

      <g opacity="0.86" strokeLinecap="round">
        <path
          d="M245 611H1355"
          stroke="#FBF7F2"
          strokeWidth="5"
          strokeOpacity="0.84"
        />
        <path
          d="M245 611H1355"
          stroke="url(#xprize-grid-brand)"
          strokeWidth="1.4"
          strokeOpacity="0.52"
          filter="url(#xprize-grid-aqua-glow)"
        />
        <path
          d="M328 596V627M456 596V627M584 596V627M716 596V627M848 596V627M980 596V627M1112 596V627M1240 596V627"
          stroke="#BFB7AF"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
      </g>

      <g opacity="0.78" filter="url(#xprize-grid-soft-shadow)">
        <path
          d="M676 313L642 358L685 386L716 341L676 313Z"
          fill="#FFFFFF"
          fillOpacity="0.22"
          stroke="url(#xprize-grid-glass-stroke)"
          strokeWidth="1"
        />
        <path
          d="M922 313L958 358L915 386L884 341L922 313Z"
          fill="#FFFFFF"
          fillOpacity="0.22"
          stroke="url(#xprize-grid-glass-stroke)"
          strokeWidth="1"
        />
        <path
          d="M662 353L636 472"
          stroke="#CFC7BF"
          strokeOpacity="0.34"
          strokeWidth="1.2"
        />
        <path
          d="M938 353L964 472"
          stroke="#CFC7BF"
          strokeOpacity="0.34"
          strokeWidth="1.2"
        />
        <path
          d="M653 334L703 368M947 334L897 368"
          stroke="url(#xprize-grid-brand)"
          strokeOpacity="0.42"
          strokeWidth="1"
        />
      </g>

      <g clipPath="url(#xprize-grid-left-crop)" filter="url(#xprize-grid-car-shadow)">
        <ellipse
          cx="228"
          cy="607"
          rx="214"
          ry="106"
          fill="#6B191B"
          opacity="0.11"
        />
        <g transform="translate(-74 316)">
          <path
            d="M166 64C218 48 332 42 415 82L469 178C372 142 246 136 126 170L166 64Z"
            fill="#181A20"
            fillOpacity="0.88"
          />
          <path
            d="M156 74C224 58 323 58 390 91L428 157C318 128 224 129 116 163L156 74Z"
            fill="url(#xprize-grid-scarlet)"
          />
          <path
            d="M171 82C235 71 314 73 374 99"
            stroke="#FFE7E2"
            strokeOpacity="0.62"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M230 78C279 70 339 80 389 104L456 332C374 308 266 304 160 326L230 78Z"
            fill="url(#xprize-grid-scarlet)"
          />
          <path
            d="M282 93C315 94 350 103 381 120L418 268C366 248 286 246 222 262L282 93Z"
            fill="#FFF5F4"
            fillOpacity="0.16"
          />
          <path
            d="M244 114C282 103 344 110 376 132L406 248C357 234 294 234 246 246L244 114Z"
            fill="#2B1116"
            fillOpacity="0.16"
          />
          <path
            d="M335 121L535 216C552 224 562 239 558 253L549 288L378 265L335 121Z"
            fill="#A71826"
          />
          <path
            d="M127 168L38 208L34 254L188 254L231 154L127 168Z"
            fill="#8F101A"
          />
          <ellipse
            cx="96"
            cy="291"
            rx="54"
            ry="92"
            transform="rotate(-7 96 291)"
            fill="url(#xprize-grid-tire)"
          />
          <ellipse
            cx="453"
            cy="292"
            rx="54"
            ry="92"
            transform="rotate(-7 453 292)"
            fill="url(#xprize-grid-tire)"
          />
          <ellipse
            cx="96"
            cy="291"
            rx="31"
            ry="55"
            transform="rotate(-7 96 291)"
            fill="#30343D"
            fillOpacity="0.54"
          />
          <ellipse
            cx="453"
            cy="292"
            rx="31"
            ry="55"
            transform="rotate(-7 453 292)"
            fill="#30343D"
            fillOpacity="0.54"
          />
          <path
            d="M165 325C248 301 352 302 463 331"
            stroke="#FFB2A9"
            strokeOpacity="0.42"
            strokeWidth="2"
          />
          <path
            d="M260 82L218 264M308 91L292 254M357 109L369 261M403 164L523 228M90 211L208 231"
            stroke="#25090E"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <path
            d="M164 74C236 60 321 62 390 91"
            stroke="#FFE2DE"
            strokeOpacity="0.68"
            strokeWidth="1.3"
          />
          <path
            d="M207 84L180 252M396 142L523 228M123 182L64 230"
            stroke="#FFFFFF"
            strokeOpacity="0.18"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </g>

      <g clipPath="url(#xprize-grid-right-crop)" filter="url(#xprize-grid-car-shadow)">
        <ellipse
          cx="1372"
          cy="607"
          rx="214"
          ry="106"
          fill="#4E5663"
          opacity="0.1"
        />
        <g transform="translate(1098 316)">
          <path
            d="M394 64C342 48 228 42 145 82L91 178C188 142 314 136 434 170L394 64Z"
            fill="#16191F"
            fillOpacity="0.88"
          />
          <path
            d="M404 74C336 58 237 58 170 91L132 157C242 128 336 129 444 163L404 74Z"
            fill="url(#xprize-grid-silver)"
          />
          <path
            d="M389 82C325 71 246 73 186 99"
            stroke="#FFFFFF"
            strokeOpacity="0.68"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M330 78C281 70 221 80 171 104L104 332C186 308 294 304 400 326L330 78Z"
            fill="url(#xprize-grid-silver)"
          />
          <path
            d="M278 93C245 94 210 103 179 120L142 268C194 248 274 246 338 262L278 93Z"
            fill="#FFFFFF"
            fillOpacity="0.2"
          />
          <path
            d="M316 114C278 103 216 110 184 132L154 248C203 234 266 234 314 246L316 114Z"
            fill="#10151D"
            fillOpacity="0.16"
          />
          <path
            d="M225 121L25 216C8 224 -2 239 2 253L11 288L182 265L225 121Z"
            fill="#5C6471"
          />
          <path
            d="M433 168L522 208L526 254L372 254L329 154L433 168Z"
            fill="#737B88"
          />
          <ellipse
            cx="464"
            cy="291"
            rx="54"
            ry="92"
            transform="rotate(7 464 291)"
            fill="url(#xprize-grid-tire)"
          />
          <ellipse
            cx="107"
            cy="292"
            rx="54"
            ry="92"
            transform="rotate(7 107 292)"
            fill="url(#xprize-grid-tire)"
          />
          <ellipse
            cx="464"
            cy="291"
            rx="31"
            ry="55"
            transform="rotate(7 464 291)"
            fill="#343943"
            fillOpacity="0.58"
          />
          <ellipse
            cx="107"
            cy="292"
            rx="31"
            ry="55"
            transform="rotate(7 107 292)"
            fill="#343943"
            fillOpacity="0.58"
          />
          <path
            d="M395 325C312 301 208 302 97 331"
            stroke="#F3F6FB"
            strokeOpacity="0.44"
            strokeWidth="2"
          />
          <path
            d="M300 82L342 264M252 91L268 254M203 109L191 261M157 164L37 228M470 211L352 231"
            stroke="#11151C"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <path
            d="M396 74C324 60 239 62 170 91"
            stroke="#FFFFFF"
            strokeOpacity="0.72"
            strokeWidth="1.3"
          />
          <path
            d="M353 84L380 252M164 142L37 228M437 182L496 230"
            stroke="#FFFFFF"
            strokeOpacity="0.22"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </g>

      <g filter="url(#xprize-grid-aqua-glow)" opacity="0.68">
        <path
          d="M800 566C796 496 797 414 800 309"
          stroke="url(#xprize-grid-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.36"
        />
        <path
          d="M736 571C753 486 772 413 800 309"
          stroke="url(#xprize-grid-brand)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.22"
        />
        <path
          d="M864 571C847 486 828 413 800 309"
          stroke="url(#xprize-grid-brand)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.22"
        />
      </g>

      <g filter="url(#xprize-grid-soft-shadow)">
        <ellipse
          cx="800"
          cy="620"
          rx="184"
          ry="48"
          fill="#6C4CF1"
          fillOpacity="0.1"
        />
        <ellipse
          cx="800"
          cy="604"
          rx="118"
          ry="34"
          fill="#36E0C2"
          fillOpacity="0.08"
          filter="url(#xprize-grid-aqua-glow)"
        />
        <path
          d="M684 556L744 492L835 493L908 560L859 634L738 631L684 556Z"
          fill="url(#xprize-grid-unicorn-fill)"
          stroke="url(#xprize-grid-glass-stroke)"
          strokeWidth="2"
        />
        <path
          d="M744 492L767 421L824 382L899 420L862 493H744Z"
          fill="#FFFFFF"
          fillOpacity="0.28"
          stroke="url(#xprize-grid-glass-stroke)"
          strokeWidth="1.7"
        />
        <path
          d="M824 382L846 306L862 398L824 382Z"
          fill="#FFFFFF"
          fillOpacity="0.28"
          stroke="url(#xprize-grid-brand)"
          strokeWidth="1.8"
          filter="url(#xprize-grid-glow)"
        />
        <path
          d="M893 420L968 454L880 486L893 420Z"
          fill="#FFFFFF"
          fillOpacity="0.18"
          stroke="url(#xprize-grid-glass-stroke)"
          strokeWidth="1.25"
        />
        <path
          d="M767 421L716 466L744 492L790 446L767 421Z"
          fill="#A99BFF"
          fillOpacity="0.18"
          stroke="#FFFFFF"
          strokeOpacity="0.58"
          strokeWidth="1.1"
        />
        <path
          d="M684 556L796 534L738 631Z"
          fill="#6C4CF1"
          fillOpacity="0.16"
        />
        <path
          d="M796 534L835 493L908 560L859 634Z"
          fill="#2EC5E8"
          fillOpacity="0.15"
        />
        <path
          d="M744 492L796 534L744 492M796 534L835 493M796 534L738 631M796 534L859 634M824 382L835 493M767 421L835 493M893 420L862 493"
          stroke="#FFFFFF"
          strokeOpacity="0.56"
          strokeWidth="1.15"
        />
        <path
          d="M715 560L642 614L742 600M890 560L964 613L854 602"
          stroke="url(#xprize-grid-glass-stroke)"
          strokeOpacity="0.76"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M742 632L718 698M808 635L800 706M858 631L896 694"
          stroke="url(#xprize-grid-glass-stroke)"
          strokeOpacity="0.72"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        <path
          d="M704 599C750 636 852 638 900 600"
          stroke="url(#xprize-grid-brand)"
          strokeOpacity="0.58"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#xprize-grid-glow)"
        />
        <circle
          cx="867"
          cy="443"
          r="4.5"
          fill="#FFFFFF"
          fillOpacity="0.76"
        />
      </g>

      <g opacity="0.42" strokeLinecap="round">
        <path
          d="M506 666C612 637 696 641 760 677"
          stroke="url(#xprize-grid-brand)"
          strokeWidth="1"
        />
        <path
          d="M1094 666C988 637 904 641 840 677"
          stroke="url(#xprize-grid-brand)"
          strokeWidth="1"
        />
        <path
          d="M652 290C731 262 875 262 950 290"
          stroke="#CFC7BF"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

export default BuildingXprizeStartingGridCover;
