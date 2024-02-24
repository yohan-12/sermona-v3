import { BookOpen, CircleIcon, Users, Sparkle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
const MemberCard = () => {
  return (
    <Link href="/dashboard/people">
      <div className="relative group overflow-hidden bg-white rounded-lg shadow-lg">
        <div className="p-4 transition-transform duration-300 transform group-hover:-translate-y-20">
          <Card className="overflow-hidden">
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 mb-10">
              <div className="space-y-1">
                <CardTitle>
                  <Users className="mr-2 h-5 w-5" />
                </CardTitle>
              </div>
              <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground justify-end">
                <Badge
                  variant="outline"
                  className="text-black-500 bg-green-400"
                >
                  무료
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 text-muted-foreground">
                <div className="flex items-center font-bold">
                  <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                  교적부
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-1 h-4 w-4" />
                  교인 목록 보기 / 추가 / 업데이트
                </div>
                {/* <div>Updated April 2023</div> */}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white transition-transform duration-300 transform translate-y-full group-hover:translate-y-[10%]">
          <CardContent>
            <div className="flex space-x-4 text-muted-foreground">
              <div className="flex items-center">
                직관적인 교인 관리 도구를 통해 교인 정보를 원활하게 추가
                업데이트 및 정리하여 편하게 관리하세요.
              </div>
              <Button>
                <Sparkle className="mr-2 h-4 w-4" /> 시작하기
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Link>
  );
};

export default MemberCard;
